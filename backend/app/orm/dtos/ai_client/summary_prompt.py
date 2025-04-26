"""
This module contains the DTO for the summary prompt.
"""

from typing import Literal
from pydantic import BaseModel, Field


class SummaryPrompt(BaseModel):
    """
    This class contains the DTO for the summary prompt.
    """


    body: str = Field(..., min_length=10)
    mode: Literal["paragraph", "bullet_points"]
    length: Literal["very_short", "short", "average", "long"]


class SummaryPromptDto(SummaryPrompt):
    """
    This class contains the DTO for the summary prompt.
    """

    user_email: str
