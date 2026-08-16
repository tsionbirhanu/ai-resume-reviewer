from typing import Annotated

from fastapi import APIRouter, File, Form, UploadFile

from app.controllers.review_controller import review_resume_controller

router = APIRouter(tags=["review"])


@router.post("/review")
async def review_resume(
    resume_file: Annotated[UploadFile | None, File(alias="resume")] = None,
    resume_text: Annotated[str | None, Form()] = None,
    job_description: Annotated[str, Form()] = "",
) -> dict[str, bool | dict]:
    return await review_resume_controller(
        resume_file=resume_file,
        resume_text=resume_text,
        job_description=job_description,
    )
