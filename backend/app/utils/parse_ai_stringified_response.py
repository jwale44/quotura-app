"""
This module contains the utility function for parsing the ai stringified response.
"""

import json


def parse_ai_stringified_response(response: str):
    """
    Parse the ai stringified response.
    """
    try:
        return json.loads(response)
    except json.JSONDecodeError as exc:
        raise ValueError("Invalid JSON response") from exc
