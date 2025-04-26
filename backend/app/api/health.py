"""
This module contains the health check API endpoint.
"""

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/")
async def health_check():
    """
    Check the health status of the server.

    Returns:
        dict: A dictionary containing the health status
    """
    return {"status": "active", "healthy": True}
