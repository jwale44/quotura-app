"""
This module contains a utility function to clean a JSON string.
"""

import re


def clean_json_string(json_string: str) -> str:
    """
    Clean a JSON string by removing all non-JSON characters.
    """
    pattern = r"^```json\s*(.*?)\s*```$"
    cleaned_string = re.sub(pattern, r"\1", json_string, flags=re.DOTALL)
    return cleaned_string.strip()
