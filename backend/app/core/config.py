"""
This is the configuration file for the application.
It is responsible for loading the environment variables and the database connection.
"""

from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    This is the settings class for the application.
    It is responsible for loading the environment variables and the database connection.
    """

    DATABASE_URL: str
    DATABASE_URL_MIGRATION: str
    GOOGLE_API_KEY: str
    CLERK_BACKEND_URL: str
    CLERK_SECRET_KEY: str
    CORS_ORIGINS: str
    PAYSTACK_BACKEND_URL: str
    PAYSTACK_SECRET_KEY: str

    @property
    def get_cors_origins(self) -> List[str]:
        """Get Cors Origins"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    class Config:
        """
        This is the config class for the settings.
        It is responsible for loading the environment variables from the .env file.
        """

        env_file = ".env"


settings = Settings()
