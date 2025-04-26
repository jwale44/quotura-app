"""
This module contains the DTO for the generate essay prompt.
"""

from pydantic import BaseModel


class GenerateEssayPrompt(BaseModel):
    """
    Prompt for generating an essay.
    """

    topic: str
    length: str
    expected_type: str
    keywords: list[str]
    audience: str
    tone: str
    style: str
    structure: str
    citations: bool
    sources: bool

class GenerateEssayPromptDto(GenerateEssayPrompt):
    """
    DTO for generating an essay.
    """

    user_id: str
