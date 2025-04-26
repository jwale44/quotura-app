"""
This module contains the service for the AI client.
"""

import textwrap
from google import genai
from app.core.config import settings

# from app.utils.clean_json_string import clean_json_string
from app.orm.dtos.ai_client.generate_essay_prompt import GenerateEssayPrompt
from app.orm.dtos.ai_client.summary_prompt import SummaryPrompt


class AiClientService:
    """
    This class contains the service for the AI client.
    """

    def __init__(self):
        """
        Initialize the AI client service with a database session.
        """
        self.client = genai.Client(api_key=settings.GOOGLE_API_KEY)

    async def generate_summary(self, summary_prompt_data: SummaryPrompt):
        """
        Generate a summary.
        """
        prompt = self.build_summary_prompt(summary_prompt_data)

        response = self.client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        response_text = response.text

        return {"summary": response_text}

    def build_summary_prompt(self, prompt_data: SummaryPrompt):
        """
        Build a prompt.
        """

        expected_type_constraints = {
            "paragraph": "paragraph",
            "bullet_points": "bullet points",
        }

        length_constraints = {
            "very_short": "1-2 sentences (max 50 words)",
            "short": "3-4 sentences (50-100 words)",
            "average": "1 paragraph (100-150 words)",
            "long": "2-3 paragraphs (150-250+ words)",
        }

        expected_type = expected_type_constraints.get(prompt_data.mode)
        length = length_constraints.get(prompt_data.length)
        essay_body = prompt_data.body

        if not expected_type or not length:
            raise ValueError("Invalid expected type or length")

        prompt = f"""
        Essay Body: {essay_body}

        Summarize the following essay using {expected_type} format.

        The summary should be {length}.

        Ensure the response is in markdown format.
        Ensure clarity, coherence, and inclusion of key ideas.
        Go straight to the point and don't include any preamble.
        """

        return textwrap.dedent(prompt).strip()

    async def generate_essay(self, essay_prompt_data: GenerateEssayPrompt):
        """
        Generate an essay.
        """
        prompt = self.build_essay_prompt(essay_prompt_data)

        response = self.client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        response_text = response.text

        return {"response": response_text}

    def build_essay_prompt(self, prompt_data: GenerateEssayPrompt):
        """
        Build a prompt.
        """

        prompt = f"""
        Generate an essay on the topic: {prompt_data.topic}
        The essay should be {prompt_data.length}
        The essay should be {prompt_data.expected_type}
        The essay should be {prompt_data.keywords}
        The essay should be {prompt_data.audience}
        """

        return textwrap.dedent(prompt).strip()
