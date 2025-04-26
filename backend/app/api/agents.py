"""
This module contains the API for the agents.
"""

from typing import Dict
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.security import get_current_user
from app.services.agents import AgentsService
from app.services.ai_client import AiClientService
from app.orm.dtos.ai_client.summary_prompt import SummaryPrompt, SummaryPromptDto
from app.orm.dtos.ai_client.generate_essay_prompt import GenerateEssayPromptDto


router = APIRouter(prefix="/agents", tags=["agents"])


class AgentAPI:
    """
    API class for agent operations.
    """

    def __init__(self, session: AsyncSession, current_user: Dict):
        self.session = session
        self.current_user = current_user
        self.ai_client = AiClientService()
        self.agents_service = AgentsService(session)

    async def generate_summary(self, summary_prompt_data: SummaryPrompt):
        """
        Generate a summary.
        """
        user_email = self.current_user.get("email_addresses")[0].get("email_address")
        summary_prompt_dto = SummaryPromptDto(
            **summary_prompt_data.model_dump(), user_email=user_email
        )
        return await self.agents_service.generate_summary(summary_prompt_dto)

    async def generate_essay(self, essay_prompt_data: GenerateEssayPromptDto):
        """
        Generate an essay.
        """
        return await self.ai_client.generate_essay(essay_prompt_data)


async def get_agent_api(
    session: AsyncSession = Depends(get_db),
    current_user: Dict = Depends(get_current_user),
):
    """
    Get the agent API.

    Args:
        session: The database session.

    Returns:
        The agent API.
    """
    return AgentAPI(session, current_user)


@router.post("/summary")
async def generate_summary(
    summary_prompt_data: SummaryPrompt, agent_api: AgentAPI = Depends(get_agent_api)
):
    """
    Generate a summary.
    """
    return await agent_api.generate_summary(summary_prompt_data)


@router.post("/essay")
async def generate_essay(
    essay_prompt_data: GenerateEssayPromptDto,
    agent_api: AgentAPI = Depends(get_agent_api),
):
    """
    Generate an essay.
    """
    return await agent_api.generate_essay(essay_prompt_data)
