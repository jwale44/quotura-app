"""
This module contains the security functions for the application.
It is responsible for validating the JWT token and the user's credentials.
"""

import time
from typing import Annotated, Dict
import requests
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.db.session import get_db
from app.orm.repositories.user.user_repository import UserRepository

ALGORITHM = "RS256"
CLERK_JWKS_URL = f"{settings.CLERK_BACKEND_URL}/jwks"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Cache for JWKS to avoid frequent requests
JWKS_CACHE = None
JWKS_CACHE_TIME = None


async def get_jwks():
    """Fetch and cache JWKS from Clerk"""
    global JWKS_CACHE, JWKS_CACHE_TIME

    # If cache is valid (less than 1 hour old), use it
    current_time = time.time()
    if JWKS_CACHE and JWKS_CACHE_TIME and current_time - JWKS_CACHE_TIME < 3600:
        return JWKS_CACHE

    # Fetch fresh JWKS
    response = requests.get(
        CLERK_JWKS_URL,
        headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
        timeout=25,
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not fetch JWKS",
        )

    jwks_cache = response.json()
    jwks_cache_time = current_time
    return jwks_cache


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: AsyncSession = Depends(get_db),
) -> Dict:
    """
    This function is used to get the current user from the JWT token.
    """
    user_repository = UserRepository(db)

    try:
        # Get token header to extract key ID (kid)
        token_headers = jwt.get_unverified_header(token)
        kid = token_headers.get("kid")

        if not kid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format"
            )

        # Get JWKS
        jwks = await get_jwks()

        # Find the right key
        rsa_key = None
        for key in jwks.get("keys", []):
            if key.get("kid") == kid:
                rsa_key = key
                break

        if not rsa_key:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token signature",
            )

        # Decode and validate token
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=[ALGORITHM],
            options={"verify_aud": False},  # Adjust based on your requirements
        )

        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token claims"
            )

        clerk_user_obj = await get_user_from_clerk(user_id)

        user_from_db = await user_repository.find_by_auth_provider_id(user_id)

        clerk_user_obj["user_db_id"] = user_from_db.id if user_from_db else None
        return clerk_user_obj

    except JWTError as exc:
        print("JWT Error:", exc)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        ) from exc


async def get_user_from_clerk(user_id: str) -> Dict:
    """
    This function is used to get the user from Clerk.
    """
    response = requests.get(
        f"{settings.CLERK_BACKEND_URL}/users/{user_id}",
        headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
        timeout=25,
    )
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    return response.json()
