"""
This module contains the data transfer objects for the user repository.
"""

from typing import Optional
from pydantic import BaseModel
from app.orm.models.user import UserRole


class CreateUserDto(BaseModel):
    """
    Create User DTO
    """

    company_name: str
    role: Optional[UserRole] = UserRole.STANDARD

class CreateUserServiceDto(BaseModel):
    """
    Create User Service DTO
    """

    auth_provider_id: str
    email: str
    first_name: str
    last_name: str
    company_name: str
    role: Optional[UserRole] = UserRole.STANDARD