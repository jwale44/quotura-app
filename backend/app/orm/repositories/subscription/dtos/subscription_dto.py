"""
This module contains the data transfer object for the subscription service and repository
"""

from uuid import UUID
from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class VerifyPlanPaymentDto(BaseModel):
    """
    Verify plan dto
    """

    reference: str


class CreateSubscriptionInServiceDto(BaseModel):
    """
    Create subscription
    """

    user_id: Optional[UUID] = None
    plan_code: str
    reference: str
    paystack_subscription_code: Optional[str] = None
    expires_at: Optional[datetime] = None


class CreateSubscriptionInRepositoryDto(BaseModel):
    """
    Create subscription
    """

    user_id: Optional[UUID] = None
    plan_code: str
    paystack_subscription_code: Optional[str] = None
    paystack_subscription_email_token: Optional[str] = None
    expires_at: Optional[datetime] = None


class CreatePlanSubscriptionDto(CreateSubscriptionInServiceDto):
    """
    Create plan subscription
    """

    user_email: str


class InitializePaymentDto(BaseModel):
    """
    Initialize Payment DTO
    """

    reference: str
    callback_url: str
    plan: str
