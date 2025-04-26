"""
This is the Subscription model for the application
It is responsible for creating the subscription table in the database
"""

import uuid
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, UUID, String, DateTime, ForeignKey
from app.orm.models.base import Base


class Subscription(Base):
    """
    This is the Subscription model for the application
    It is responsible for creating the subscription table in the database
    """

    __tablename__ = "subscriptions"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="subscriptions")

    plan_code = Column(String, nullable=False)
    paystack_subscription_code = Column(String, nullable=False)
    paystack_subscription_email_token = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.now)
    expires_at = Column(DateTime, nullable=False)

    def __repr__(self):
        """Return string representation of the user."""
        return f"<User {self.plan_code}>"

    def to_dict(self):
        """Convert plan object to dictionary"""
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "plan_code": self.plan_code,
            "created_at": self.created_at,
            "expires_at": self.expires_at,
        }
