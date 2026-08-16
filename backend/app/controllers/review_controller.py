from fastapi import UploadFile

from app.core.exceptions import InvalidInputError
from app.schemas.review_schemas import ResumeReviewResult
from app.services.resume_parser_service import extract_text_from_pdf
from app.services.review_service import ReviewService


async def review_resume_controller(
    *,
    resume_file: UploadFile | None,
    resume_text: str | None,
    job_description: str,
    review_service: ReviewService | None = None,
) -> dict[str, bool | dict]:
    has_file = resume_file is not None and bool(resume_file.filename)
    has_text = bool(resume_text and resume_text.strip())

    if has_file and has_text:
        raise InvalidInputError("Submit either resume text or a resume PDF, not both.")

    if not has_file and not has_text:
        raise InvalidInputError("Submit either resume text or a resume PDF.")

    resolved_resume_text = (
        await extract_text_from_pdf(resume_file) if has_file and resume_file else resume_text
    )

    service = review_service or ReviewService()
    result: ResumeReviewResult = await service.review_resume(
        resume_text=resolved_resume_text,
        job_description=job_description,
    )

    return {
        "success": True,
        "data": result.model_dump(mode="json"),
    }
