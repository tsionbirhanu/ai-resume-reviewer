import pytest
from pydantic import ValidationError

from app.schemas.review_schemas import ResumeReviewResult


VALID_RESULT = {
    "overallScore": 80,
    "atsScore": 75,
    "skillsMatchScore": 90,
    "experienceMatchScore": 70,
    "strengths": ["Strong React and FastAPI evidence."],
    "matchedSkills": ["React", "FastAPI"],
    "missingSkills": ["Kubernetes"],
    "keywordAnalysis": {
        "matchedKeywords": ["React"],
        "missingKeywords": ["Kubernetes"],
        "notes": "Good keyword coverage with one infrastructure gap.",
    },
    "sectionReviews": [
        {"section": "Experience", "score": 82, "feedback": "Relevant work."}
    ],
    "bulletImprovements": [
        {
            "original": "Built APIs.",
            "improved": "Built FastAPI services with validated contracts.",
            "reason": "Adds specificity without inventing metrics.",
        }
    ],
    "recommendations": ["Add one infrastructure example if accurate."],
}


def test_review_schema_accepts_valid_result():
    result = ResumeReviewResult.model_validate(VALID_RESULT)

    assert result.overallScore == 80
    assert result.keywordAnalysis.notes


@pytest.mark.parametrize("field", ["overallScore", "atsScore", "skillsMatchScore", "experienceMatchScore"])
def test_review_schema_rejects_score_out_of_bounds(field):
    payload = VALID_RESULT | {field: 101}

    with pytest.raises(ValidationError):
        ResumeReviewResult.model_validate(payload)


def test_review_schema_rejects_missing_required_field():
    payload = VALID_RESULT.copy()
    payload.pop("strengths")

    with pytest.raises(ValidationError):
        ResumeReviewResult.model_validate(payload)


def test_review_schema_rejects_empty_required_string_items():
    payload = VALID_RESULT | {"strengths": [""]}

    with pytest.raises(ValidationError):
        ResumeReviewResult.model_validate(payload)
