"""This module contains the API routes for subscription actions"""

from typing import Dict
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.security import get_current_user
from app.services.user import UserService
from app.services.subscription import SubscriptionService
from app.orm.repositories.subscription.dtos.subscription_dto import (
    CreateSubscriptionInServiceDto,
    CreatePlanSubscriptionDto,
    InitializePaymentDto,
)

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


class SubscriptionAPI:
    """
    API class for subscription operations
    """

    def __init__(self, session: AsyncSession, current_user: Dict):
        """
        Initialize the subscription API with a database session
        """
        self.session = session
        self.current_user = current_user
        self.user_service = UserService(session)
        self.subscription_service = SubscriptionService(session)

    async def list_plans(self):
        """
        Get all plans.
        """
        return await self.subscription_service.get_all_plans()

    async def list_subscriptions(self):
        """Get all subscriptions"""
        return await self.subscription_service.get_all_subscriptions()

    async def create_plan_subscription(self, payload: CreateSubscriptionInServiceDto):
        """Create plan subscription for user"""
        user_email = self.current_user.get("email_addresses")[0].get("email_address")

        create_plan_subscription_dto = CreatePlanSubscriptionDto(
            plan_code=payload.plan_code,
            reference=payload.reference,
            user_email=user_email,
        )

        return await self.subscription_service.create_plan_subscription(
            create_plan_subscription_dto
        )

    async def get_user_active_subscription(self):
        """Get user active subscription"""
        user_id = self.current_user.get("user_db_id")
        return await self.subscription_service.get_active_subscription(user_id)

    async def initialize_payment(self, payload: InitializePaymentDto):
        """Initialize Payment"""
        user_email = self.current_user.get("email_addresses")[0].get("email_address")
        return await self.subscription_service.initialize_payment(user_email, payload)


async def get_subscription_api(
    session: AsyncSession = Depends(get_db),
    current_user: Dict = Depends(get_current_user),
):
    """
    Get subscription api
    """
    return SubscriptionAPI(session, current_user)


@router.get("/plans")
async def get_all_plans(
    subscription_api: SubscriptionAPI = Depends(get_subscription_api),
):
    """Get all plans"""
    return await subscription_api.list_plans()


@router.get("/")
async def get_all_subscriptions(
    subscription_api: SubscriptionAPI = Depends(get_subscription_api),
):
    """Get all subscriptions"""
    return await subscription_api.list_subscriptions()


@router.post("/verify-payment", status_code=200)
async def verify_initialize_subscription(
    payload: CreateSubscriptionInServiceDto,
    subscription_api: SubscriptionAPI = Depends(get_subscription_api),
):
    """Verify and Initialize a user subscription"""
    return await subscription_api.create_plan_subscription(payload)


@router.get("/me")
async def get_user_active_subscription(
    subscription_api: SubscriptionAPI = Depends(get_subscription_api),
):
    """Get user active subscription"""
    return await subscription_api.get_user_active_subscription()


@router.post("/initialize-payment", status_code=200)
async def initialize_payment(
    payload: InitializePaymentDto,
    subscription_api: SubscriptionAPI = Depends(get_subscription_api),
):
    """Initialize subscription payment"""
    return await subscription_api.initialize_payment(payload)
