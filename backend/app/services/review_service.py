from pydantic import ValidationError

from app.core.exceptions import AIProviderError, InvalidInputError, UnusableTextError
from app.schemas.request_schemas import PastedResumeReviewRequest
from app.schemas.review_schemas import ResumeReviewResult
from app.services.gemini_service import GeminiService
from app.services.resume_parser_service import MIN_EXTRACTED_TEXT_LENGTH


class ReviewService:
    def __init__(self, gemini_service: GeminiService | None = None) -> None:
        self.gemini_service = gemini_service or GeminiService()

    async def review_resume(
        self, resume_text: str | None, job_description: str
    ) -> ResumeReviewResult:
        normalized_resume_text = normalize_text(resume_text)
        normalized_job_description = normalize_text(job_description)

        if len(normalized_resume_text) < MIN_EXTRACTED_TEXT_LENGTH:
            raise UnusableTextError()

        try:
            validated_request = PastedResumeReviewRequest(
                resume_text=normalized_resume_text,
                job_description=normalized_job_description,
            )
        except ValidationError as exc:
            if has_job_description_length_error(exc):
                raise InvalidInputError(
                    "Job description must be at least 100 characters."
                ) from exc
            raise InvalidInputError("Resume text and job description are required.") from exc

        result = await self.gemini_service.review_resume(
            resume_text=validated_request.resume_text,
            job_description=validated_request.job_description,
        )
        self._validate_business_result(result)
        return result

    def _validate_business_result(self, result: ResumeReviewResult) -> None:
        if not result.strengths or not result.sectionReviews or not result.recommendations:
            raise AIProviderError()
        if not result.keywordAnalysis.matchedKeywords:
            raise AIProviderError()


def normalize_text(value: str | None) -> str:
    return " ".join((value or "").split())


def has_job_description_length_error(exc: ValidationError) -> bool:
    return any(
        "job_description" in error.get("loc", ())
        and error.get("type") == "string_too_short"
        for error in exc.errors()
    )
