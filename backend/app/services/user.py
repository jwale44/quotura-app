"""
This module contains the service layer for user operations.
It acts as an abstraction layer between the API routes and the repository.
"""

from uuid import UUID
import requests
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.orm.repositories.user.user_repository import UserRepository
from app.orm.repositories.user.dtos.create_user_dto import CreateUserServiceDto
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto
from app.core.config import settings


class UserService:
    """
    Service class for user operations.
    """

    def __init__(self, session: AsyncSession):
        """
        Initialize the user service with a database session.

        Args:
            session: The database session to use for operations.
        """
        self.session = session
        self.user_repository = UserRepository(session)

    async def create_user(self, payload: CreateUserServiceDto):
        """
        Create a new user.

        Args:
            payload: The user data to create.

        Returns:
            The created user.
        """
        response = requests.patch(
            f"{settings.CLERK_BACKEND_URL}/users/{payload.auth_provider_id}/metadata",
            headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
            json={"public_metadata": {"isOnboarded": True}},
            timeout=25,
        )

        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to create user")

        existing_user = await self.user_repository.find_by_email(payload.email)

        if existing_user:
            return

        user = await self.user_repository.create(payload)

        if not user:
            response = requests.patch(
                f"{settings.CLERK_BACKEND_URL}/users/{payload.auth_provider_id}/metadata",
                headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
                json={"public_metadata": {"isOnboarded": False}},
                timeout=25,
            )
            raise HTTPException(status_code=400, detail="Failed to create user")

        existing_paystack_customer_response = requests.get(
            f"{settings.PAYSTACK_BACKEND_URL}/customer/{payload.email}",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
            timeout=20
        )

        if existing_paystack_customer_response.status_code == 200:
            paystack_customer = existing_paystack_customer_response.json()

            paystack_customer_code = paystack_customer["data"]["customer_code"]

            update_customer = UpdateUserDto(paystack_customer_id=paystack_customer_code)

            await self.user_repository.update(user.id, update_customer)
            return

        paystack_customer_response = requests.post(
            f"{settings.PAYSTACK_BACKEND_URL}/customer",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
            json={
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
            timeout=25,
        )
        if paystack_customer_response.status_code != 200:
            await self.user_repository.delete(user.id)
            response = requests.patch(
                f"{settings.CLERK_BACKEND_URL}/users/{payload.auth_provider_id}/metadata",
                headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
                json={"public_metadata": {"isOnboarded": False}},
                timeout=25,
            )
            raise HTTPException(status_code=400, detail="Failed to create user")

        paystack_customer = paystack_customer_response.json()

        paystack_customer_code = paystack_customer["data"]["customer_code"]

        update_customer = UpdateUserDto(paystack_customer_id=paystack_customer_code)

        await self.user_repository.update(user.id, update_customer)
        return

    async def get_all_users(self):
        """
        Get all users.

        Returns:
            A list of all users.
        """
        return await self.user_repository.find_all()

    async def get_user_by_id(self, user_id: UUID):
        """
        Get a user by ID.

        Args:
            user_id: The ID of the user to retrieve.

        Returns:
            The user if found, None otherwise.
        """
        user = await self.user_repository.find_by_id(user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user

    async def update_user(self, user_id: UUID, payload: UpdateUserDto):
        """
        Update a user by ID.
        """
        return await self.user_repository.update(user_id, payload)
