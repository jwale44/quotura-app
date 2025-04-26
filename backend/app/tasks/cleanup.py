"""
This module contains the clean up function for subscriptions
"""

import asyncio
from app.db.session import get_db
from app.services.subscription import SubscriptionService


async def periodic_cleanup(interval_seconds=3600):
    """Run subscription cleanup every hour"""
    while True:
        try:
            db = await anext(get_db())
            try:
                await SubscriptionService.manually_cleaned_expired(db)
                print("Expired subscriptions cleanup completed")
            finally:
                await db.close()
        except Exception as e:
            print(f"Error during subscription cleanup: {e}")

        await asyncio.sleep(interval_seconds)
