from pydantic import BaseModel, ConfigDict, Field, field_validator


Score = int


class StrictReviewModel(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)


class KeywordAnalysis(StrictReviewModel):
    matchedKeywords: list[str] = Field(min_length=1)
    missingKeywords: list[str] = Field(default_factory=list)
    notes: str = Field(min_length=1)

    @field_validator("matchedKeywords", "missingKeywords")
    @classmethod
    def validate_keyword_items(cls, values: list[str]) -> list[str]:
        return validate_non_empty_strings(values)


class SectionReview(StrictReviewModel):
    section: str = Field(min_length=1)
    score: Score = Field(ge=0, le=100)
    feedback: str = Field(min_length=1)


class BulletImprovement(StrictReviewModel):
    original: str = Field(min_length=1)
    improved: str = Field(min_length=1)
    reason: str = Field(min_length=1)


class ResumeReviewResult(StrictReviewModel):
    overallScore: Score = Field(ge=0, le=100)
    atsScore: Score = Field(ge=0, le=100)
    skillsMatchScore: Score = Field(ge=0, le=100)
    experienceMatchScore: Score = Field(ge=0, le=100)
    strengths: list[str] = Field(min_length=1)
    matchedSkills: list[str] = Field(default_factory=list)
    missingSkills: list[str] = Field(default_factory=list)
    keywordAnalysis: KeywordAnalysis
    sectionReviews: list[SectionReview] = Field(min_length=1)
    bulletImprovements: list[BulletImprovement] = Field(default_factory=list)
    recommendations: list[str] = Field(min_length=1)

    @field_validator(
        "overallScore",
        "atsScore",
        "skillsMatchScore",
        "experienceMatchScore",
    )
    @classmethod
    def validate_score_bounds(cls, value: int) -> int:
        if value < 0 or value > 100:
            raise ValueError("Scores must be between 0 and 100.")
        return value

    @field_validator(
        "strengths",
        "matchedSkills",
        "missingSkills",
        "recommendations",
    )
    @classmethod
    def validate_string_lists(cls, values: list[str]) -> list[str]:
        return validate_non_empty_strings(values)


def validate_non_empty_strings(values: list[str]) -> list[str]:
    cleaned = [value.strip() for value in values]
    if any(not value for value in cleaned):
        raise ValueError("List items must be non-empty strings.")
    return cleaned
