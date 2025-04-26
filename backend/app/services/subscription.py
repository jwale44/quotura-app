"""
This module contains the services for subscription operations
"""

from datetime import datetime, timedelta
from uuid import UUID
import requests
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from app.core.config import settings
from app.orm.repositories.subscription.subscription_repository import (
    SubscriptionRepository,
)
from app.orm.repositories.subscription.dtos.subscription_dto import (
    VerifyPlanPaymentDto,
    CreatePlanSubscriptionDto,
    CreateSubscriptionInRepositoryDto,
    InitializePaymentDto,
)
from app.orm.repositories.user.user_repository import UserRepository
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto


class SubscriptionService:
    """
    Service class for subscriptions operations
    """

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repository = UserRepository(session)
        self.subscription_repository = SubscriptionRepository(session)

    async def verify_plan_payment(self, payload: VerifyPlanPaymentDto):
        """
        Verify payment
        """

        response = requests.get(
            f"{settings.PAYSTACK_BACKEND_URL}/transaction/verify/{payload.reference}",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
            timeout=25,
        )

        if response.status_code != 200:
            return {"verified": False}
        return {"verified": True}

    async def create_plan_subscription(self, payload: CreatePlanSubscriptionDto):
        """
        Crate subscription for plan
        """

        is_verified_response = await self.verify_plan_payment(
            VerifyPlanPaymentDto(reference=payload.reference)
        )

        if is_verified_response["verified"] is False:
            raise HTTPException(status_code=400, detail="Could not verify payment")

        user = await self.user_repository.find_by_email(payload.user_email)

        if not user:
            raise HTTPException(status_code=400, detail="Could not verify payment")

        user_has_subscription = await self.subscription_repository.find_by_user_id(
            user.id
        )

        # disable subscriptio in paystack
        if user_has_subscription is not None:
            disable_paystack_subscription_response = requests.post(
                f"{settings.PAYSTACK_BACKEND_URL}/subscription/disable",
                headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
                json={
                    "code": user_has_subscription.paystack_subscription_code,
                    "token": user_has_subscription.paystack_subscription_email_token,
                },
                timeout=25,
            )

            if disable_paystack_subscription_response.status_code != 200:
                raise HTTPException(status_code=400, detail="Could not verify payment")

        create_subscription_response = requests.post(
            f"{settings.PAYSTACK_BACKEND_URL}/subscription",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
            json={
                "customer": user.paystack_customer_id,
                "plan": payload.plan_code,
            },
            timeout=25,
        )

        if create_subscription_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Could not verify payment")

        paystack_subscription = create_subscription_response.json()

        # Calculate expiration date (current date + 30 days)
        expiration_date = datetime.now() + timedelta(days=30)

        create_plan_subscription_dto = CreateSubscriptionInRepositoryDto(
            user_id=user.id,
            plan_code=payload.plan_code,
            expires_at=expiration_date,
            paystack_subscription_code=paystack_subscription["data"][
                "subscription_code"
            ],
            paystack_subscription_email_token=paystack_subscription["data"][
                "email_token"
            ],
        )

        await self.subscription_repository.delete_by_user_id(user.id)
        await self.subscription_repository.create(create_plan_subscription_dto)

        credits_to_add = 0

        if create_plan_subscription_dto.plan_code == "PLN_3vep38hsat9s4tf":
            credits_to_add = 250
        elif create_plan_subscription_dto.plan_code == "PLN_5rwu5dp0li059aj":
            credits_to_add = 250 * 12
        elif create_plan_subscription_dto.plan_code == "PLN_bgmrx6f11sac6em":
            credits_to_add = 520
        elif create_plan_subscription_dto.plan_code == "PLN_7qf7zrmkygc363k":
            credits_to_add = 520 * 12

        credit_balance = user.credit_balance + credits_to_add

        await self.user_repository.update(
            user.id, UpdateUserDto(credit_balance=credit_balance)
        )

    async def get_all_plans(self):
        """
        Get all plans
        """
        response = requests.get(
            f"{settings.PAYSTACK_BACKEND_URL}/plan",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
            timeout=25,
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Could not fetch plans",
            )

        return response.json()

    async def get_all_subscriptions(self):
        """
        Get all subscriptions
        """
        response = requests.get(
            f"{settings.PAYSTACK_BACKEND_URL}/subscription",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
            timeout=25,
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Could not fetch subscriptions",
            )

        return response.json()

    async def manually_cleaned_expired(self):
        """
        Manually trigger cleanup of expired subscriptions
        Useful for systems where pg_cron cannot be installed
        """

        query = text("DELETE FROM subscriptions WHERE expires_at < NOW()")
        await self.session.execute(query)
        await self.session.commit()

    async def get_active_subscription(self, user_id: UUID):
        """
        Get user active subscription
        """

        subscription = await self.subscription_repository.find_by_user_id(user_id)

        if not subscription:
            return None

        return subscription

    async def initialize_payment(self, user_email: str, payload: InitializePaymentDto):
        """
        Initialize Payment
        """

        initialize_payment_response = requests.post(
            f"{settings.PAYSTACK_BACKEND_URL}/transaction/initialize",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
            json={
                "email": user_email,
                "amount": "0",
                "reference": payload.reference,
                "callback_url": payload.callback_url,
                "plan": payload.plan,
            },
            timeout=25,
        )

        if initialize_payment_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to initialize payment")

        return initialize_payment_response.json()
