import json
import logging

from google import genai
from google.genai import types
from pydantic import ValidationError

from app.core.config import settings
from app.core.exceptions import AIProviderError
from app.prompts.resume_review_prompt import (
    RESUME_REVIEW_SYSTEM_PROMPT,
    build_resume_review_prompt,
)
from app.schemas.review_schemas import ResumeReviewResult

logger = logging.getLogger(__name__)

GEMINI_MODEL = "gemini-2.5-flash"


class GeminiService:
    def __init__(self) -> None:
        self.client = genai.Client(api_key=settings.gemini_api_key)

    async def review_resume(
        self, resume_text: str, job_description: str
    ) -> ResumeReviewResult:
        prompt = build_resume_review_prompt(
            resume_text=resume_text,
            job_description=job_description,
        )

        try:
            response = await self.client.aio.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=RESUME_REVIEW_SYSTEM_PROMPT,
                    temperature=0.2,
                    response_mime_type="application/json",
                    response_schema=ResumeReviewResult,
                ),
            )
        except Exception as exc:
            logger.exception(
                "Gemini SDK request failed. model=%s error_type=%s",
                GEMINI_MODEL,
                type(exc).__name__,
            )
            raise AIProviderError() from exc

        return self._parse_review_response(response.text)

    def _parse_review_response(self, response_text: str | None) -> ResumeReviewResult:
        if not response_text:
            logger.error("Gemini returned an empty response. model=%s", GEMINI_MODEL)
            raise AIProviderError()

        try:
            payload = json.loads(response_text)
        except json.JSONDecodeError as exc:
            logger.exception(
                "Gemini returned invalid JSON. model=%s error_type=%s",
                GEMINI_MODEL,
                type(exc).__name__,
            )
            raise AIProviderError() from exc

        try:
            return ResumeReviewResult.model_validate(payload)
        except ValidationError as exc:
            logger.error(
                "Gemini response schema validation failed. model=%s error_count=%s",
                GEMINI_MODEL,
                len(exc.errors()),
            )
            raise AIProviderError() from exc
