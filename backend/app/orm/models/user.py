"""
This is the User model for the application.
It is responsible for creating the User table in the database.
"""

import uuid
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Column, UUID, String, DateTime, Enum, Float
from sqlalchemy.orm import relationship
from app.orm.models.base import Base


class UserRole(str, PyEnum):
    """
    This is the UserRole enum for the application.
    It is responsible for creating the UserRole enum in the database.
    """

    ADMIN = "admin"
    STANDARD = "standard"


class User(Base):
    """
    This is the User model for the application.
    It is responsible for creating the User table in the database.
    """

    __tablename__ = "users"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    auth_provider_id = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    paystack_customer_id = Column(String, nullable=True)

    role = Column(
        Enum(UserRole, name="user_role_enum"), nullable=False, default=UserRole.STANDARD
    )

    credit_balance = Column(Float, nullable=False, default=20)
    subscriptions = relationship("Subscription", back_populates="user")

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __repr__(self):
        """Return string representation of the user."""
        return f"<User {self.email}>"

    def to_dict(self):
        """Convert user object to dictionary."""
        return {
            "id": str(self.id),
            "email": self.email,
            "role": self.role.value,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    @property
    def has_sufficient_credit(self):
        """Check if the user has sufficient credit."""
        return self.credit_balance > 4
