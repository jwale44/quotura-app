"""
This module contains the repository for the Subscription model
"""

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.orm.models.subscriptions import Subscription
from app.orm.repositories.subscription.dtos.subscription_dto import (
    CreateSubscriptionInRepositoryDto,
)


class SubscriptionRepository:
    """
    Repository class for Subscription
    """

    def __init__(self, session: AsyncSession):
        """
        Initialize the Subscription Repository
        """
        self.session = session

    async def find_by_user_id(self, user_id: str):
        """
        Find subscription by user id
        """
        query = select(Subscription).where(Subscription.user_id == user_id)
        result = await self.session.scalars(statement=query)
        return result.first()

    async def create(self, payload: CreateSubscriptionInRepositoryDto):
        """
        Create subscription
        """

        subscription_data = payload.model_dump()
        mutation_value = Subscription(**subscription_data)
        self.session.add(mutation_value)
        await self.session.commit()
        await self.session.refresh(mutation_value)
        return mutation_value

    async def delete_by_user_id(self, user_id: str):
        """
        Delete subscriptions
        """

        query = delete(Subscription).where(Subscription.user_id == user_id)
        await self.session.execute(statement=query)
        await self.session.commit()
