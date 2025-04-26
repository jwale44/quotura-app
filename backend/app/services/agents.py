"""
This module contains the service for the agents.
"""

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.ai_client import AiClientService
from app.orm.dtos.ai_client.summary_prompt import SummaryPromptDto, SummaryPrompt
from app.orm.dtos.ai_client.generate_essay_prompt import GenerateEssayPrompt
from app.orm.repositories.user.user_repository import UserRepository
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto


class AgentsService:
    """
    This class contains the service for the agents.
    """

    def __init__(self, session: AsyncSession):
        self.session = session
        self.ai_client = AiClientService()
        self.user_repository = UserRepository(session)

    async def generate_summary(self, summary_prompt_data: SummaryPromptDto):
        """
        Generate a summary.
        """
        user = await self.user_repository.find_by_email(summary_prompt_data.user_email)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user.has_sufficient_credit is False:
            raise HTTPException(status_code=403, detail="Insufficient credits")

        summary_prompt = SummaryPrompt(
            body=summary_prompt_data.body,
            mode=summary_prompt_data.mode,
            length=summary_prompt_data.length,
        )

        prompt_response = await self.ai_client.generate_summary(summary_prompt)

        new_balance = user.credit_balance - 4

        update_user_dto = UpdateUserDto(credit_balance=new_balance)
        await self.user_repository.update(user.id, update_user_dto)

        return prompt_response

    async def generate_essay(self, essay_prompt_data: GenerateEssayPrompt):
        """
        Generate an essay.
        """
        user = await self.user_repository.find_by_id(essay_prompt_data.user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return await self.ai_client.generate_essay(essay_prompt_data)
