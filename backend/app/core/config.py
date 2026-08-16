from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Resume Reviewer API"
    gemini_api_key: str = Field(default="", validation_alias="GEMINI_API_KEY")
    port: int = 8000
    frontend_url: str = "http://localhost:5173"

    @field_validator("gemini_api_key")
    @classmethod
    def validate_gemini_api_key(cls, value: str) -> str:
        if not value or not value.strip():
            raise ValueError(
                "GEMINI_API_KEY is required. Add it to backend/.env before starting the API."
            )
        return value.strip()

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_ignore_empty=True,
        validate_default=True,
        extra="ignore",
    )


settings = Settings()
