"""
This module contains the repository for the user model.
"""

from uuid import UUID
from datetime import datetime
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.orm.models.user import User
from app.orm.repositories.user.dtos.create_user_dto import CreateUserDto
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto


class UserRepository:
    """
    Repository class for user operations.
    """

    def __init__(self, session: AsyncSession):
        """
        Initialize the user repository with a database session.

        Args:
            session: The database session to use for operations.
        """
        self.session = session

    async def create(self, payload: CreateUserDto):
        """
        Create a new user.

        Args:
            payload: The user data to create.

        Returns:
            The created user.
        """
        # Convert the DTO to a dictionary
        user_data = payload.model_dump()
        mutation_value = User(**user_data)
        self.session.add(mutation_value)
        await self.session.commit()
        await self.session.refresh(mutation_value)
        return mutation_value

    async def find_all(self):
        """
        Get all users.

        Returns:
            A list of all users.
        """
        query = select(User)
        result = await self.session.scalars(statement=query)
        return result.all()

    async def find_by_id(self, user_id: UUID):
        """
        Get a user by id.

        Args:
            user_id: The ID of the user to retrieve.

        Returns:
            The user if found, None otherwise.
        """
        query = select(User).where(User.id == user_id)
        result = await self.session.scalars(statement=query)
        user = result.first()
        return user

    async def find_by_auth_provider_id(self, auth_provider_id: str):
        """
        Get a user by auth provider id
        """
        query = select(User).where(User.auth_provider_id == auth_provider_id)
        result = await self.session.scalars(statement=query)
        return result.first()

    async def find_by_email(self, email: str):
        """
        Get a user by email.

        Args:
            email: The email of the user to retrieve.

        Returns:
            The user if found, None otherwise.
        """
        query = select(User).where(User.email == email)
        result = await self.session.scalars(statement=query)
        return result.first()

    async def update(self, user_id: UUID, payload: UpdateUserDto):
        """
        Update a user by id.
        Only updates fields that are provided in the payload (non-None values).
        """
        query = select(User).where(User.id == user_id)
        result = await self.session.scalars(statement=query)
        user = result.first()

        # Only update fields that are provided (not None)
        if payload.first_name is not None:
            user.first_name = payload.first_name
        if payload.last_name is not None:
            user.last_name = payload.last_name
        if payload.company_name is not None:
            user.company_name = payload.company_name
        if payload.phone is not None:
            user.phone = payload.phone
        if payload.paystack_customer_id is not None:
            user.paystack_customer_id = payload.paystack_customer_id
        if payload.credit_balance is not None:
            user.credit_balance = payload.credit_balance

        user.updated_at = datetime.now()
        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def delete(self, user_id: UUID):
        """
        Delete user
        """
        query = delete(User).where(User.id == user_id)
        await self.session.execute(statement=query)
        await self.session.commit()
