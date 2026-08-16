from pydantic import BaseModel, ConfigDict, Field, model_validator


class ResumeReviewRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    resume_text: str | None = Field(default=None, min_length=50)
    has_resume_file: bool = False
    job_description: str = Field(min_length=100)

    @model_validator(mode="after")
    def validate_resume_source(self) -> "ResumeReviewRequest":
        if not self.resume_text and not self.has_resume_file:
            raise ValueError("Either resume text or a resume PDF file is required.")
        return self


class PastedResumeReviewRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    resume_text: str = Field(min_length=50)
    job_description: str = Field(min_length=100)
