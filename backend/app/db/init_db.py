"""
This is the init_db file for the application.
It is responsible for initializing the database.
"""

from app.db.session import engine
from app.orm.models.base import Base


async def init_db():
    """Initialize the database."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
