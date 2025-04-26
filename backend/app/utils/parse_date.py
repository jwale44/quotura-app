"""
This module contains utility functions for parsing date strings into datetime objects.
"""

from datetime import datetime
from typing import Union


def parse_date_string(date_string: Union[str, None]) -> Union[datetime, None]:
    """
    Parse a date string into a datetime object.
    Supports multiple common date formats.

    Args:
        date_string: The date string to parse. Can be None.

    Returns:
        datetime object if parsing successful, None if input is None

    Raises:
        ValueError: If the date string cannot be parsed
    """
    if date_string is None:
        return None

    # List of common date formats to try
    date_formats = [
        "%Y-%m-%d",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%dT%H:%M:%S.%f",
        "%d/%m/%Y",
        "%d-%m-%Y",
        "%Y/%m/%d",
    ]

    for date_format in date_formats:
        try:
            return datetime.strptime(date_string, date_format)
        except ValueError:
            continue

    raise ValueError(
        f"Unable to parse date string: {date_string}. Supported formats are: {', '.join(date_formats)}"
    )
