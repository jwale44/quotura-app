"""
This is the main file for the FastAPI application.
It is responsible for setting up the application and the database connection.
"""

import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware
from app.db.init_db import init_db
from app.core.security import get_current_user
from app.api.health import router as health_router
from app.api.user import router as user_router
from app.api.agents import router as agents_router
from app.api.subscriptions import router as subscription_router
from app.core.config import settings
from app.tasks.cleanup import periodic_cleanup


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan for the application."""
    await init_db()
    asyncio.create_task(periodic_cleanup())
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router)

app.include_router(
    user_router, prefix="/v1", dependencies=[Depends(get_current_user)], tags=["users"]
)

app.include_router(
    agents_router,
    prefix="/v1",
    dependencies=[Depends(get_current_user)],
    tags=["agents"],
)

app.include_router(
    subscription_router,
    prefix="/v1",
    dependencies=[Depends(get_current_user)],
    tags=["subscriptions"],
)
