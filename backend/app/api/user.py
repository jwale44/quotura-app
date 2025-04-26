"""
This module contains the API routes for the user model.
"""

from typing import Dict
from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.services.user import UserService
from app.orm.repositories.user.dtos.create_user_dto import (
    CreateUserDto,
    CreateUserServiceDto,
)
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto
from app.core.security import get_current_user

router = APIRouter(prefix="/users", tags=["users"])


class UserAPI:
    """
    API class for user operations.
    """

    def __init__(self, session: AsyncSession, current_user: Dict):
        """
        Initialize the user API with a database session.

        Args:
            session: The database session to use for operations.
        """
        self.session = session
        self.current_user = current_user
        self.user_service = UserService(session)

    async def create_new_user(self, payload: CreateUserServiceDto):
        """
        Create a new user.

        Args:
            payload: The user data to create.

        Returns:
            The created user.
        """
        return await self.user_service.create_user(payload)

    async def list_users(self):
        """
        Get all users.

        Returns:
            A list of all users.
        """
        return await self.user_service.get_all_users()

    async def find_user_by_id(self, user_id: UUID):
        """
        Get a user by id.

        Args:
            user_id: The ID of the user to retrieve.

        Returns:
            The user if found.

        Raises:
            HTTPException: If the user is not found.
        """
        user = await self.user_service.get_user_by_id(user_id)

        return user

    async def update_user_by_id(self, user_id: UUID, payload: UpdateUserDto):
        """
        Update a user by id.

        Args:
            user_id: The ID of the user to update.
            payload: The user data to update.

        Returns:
            The updated user.
        """
        return await self.user_service.update_user(user_id, payload)

    async def get_credits(self):
        """Get user credits"""
        user_id = self.current_user.get("user_db_id")
        user = await self.user_service.get_user_by_id(user_id)
        return {"credits": user.credit_balance}


# Dependency to get the UserAPI instance
async def get_user_api(
    session: AsyncSession = Depends(get_db),
    current_user: Dict = Depends(get_current_user),
):
    """
    Get a UserAPI instance.

    Args:
        session: The database session to use for operations.

    Returns:
        A UserAPI instance.
    """
    return UserAPI(session, current_user)


# Route handlers
@router.post("/onboard", status_code=201)
async def create_new_user(
    payload: CreateUserDto,
    user_api: UserAPI = Depends(get_user_api),
    current_user: Dict = Depends(get_current_user),
):
    """
    Create a new user
    """

    create_user_service_dto = CreateUserServiceDto(
        auth_provider_id=current_user.get("id"),
        email=current_user.get("email_addresses")[0].get("email_address"),
        first_name=current_user.get("first_name"),
        last_name=current_user.get("last_name"),
        company_name=payload.company_name,
        role=payload.role,
    )
    return await user_api.create_new_user(create_user_service_dto)


@router.get("/")
async def list_users(user_api: UserAPI = Depends(get_user_api)):
    """
    Get all users
    """
    return await user_api.list_users()


@router.get("/me")
async def find_user_by_id(user_id: UUID, user_api: UserAPI = Depends(get_user_api)):
    """
    Get a user by id
    """
    return await user_api.find_user_by_id(user_id)


@router.put("/me")
async def update_user_by_id(
    user_id: UUID, payload: UpdateUserDto, user_api: UserAPI = Depends(get_user_api)
):
    """
    Update a user by id
    """
    return await user_api.update_user_by_id(user_id, payload)


@router.get("/credits/me")
async def get_user_credits(user_api: UserAPI = Depends(get_user_api)):
    """
    Get a user by id
    """
    return await user_api.get_credits()
