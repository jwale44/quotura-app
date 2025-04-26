"""
This module contains the DTO for the user model.
"""

from typing import Optional
from pydantic import BaseModel


class UpdateUserDto(BaseModel):
    """
    This is the DTO for the user model.
    All fields are optional - only provided values will be updated.
    """

    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company_name: Optional[str] = None
    phone: Optional[str] = None
    paystack_customer_id: Optional[str] = None
    credit_balance: Optional[float] = None
