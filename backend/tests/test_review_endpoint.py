from fastapi.testclient import TestClient

from app.main import app
from app.schemas.review_schemas import ResumeReviewResult
from app.services.gemini_service import GeminiService


VALID_RESULT = ResumeReviewResult.model_validate(
    {
        "overallScore": 88,
        "atsScore": 82,
        "skillsMatchScore": 91,
        "experienceMatchScore": 84,
        "strengths": ["Strong evidence for the core stack."],
        "matchedSkills": ["React", "FastAPI"],
        "missingSkills": ["SaaS domain language"],
        "keywordAnalysis": {
            "matchedKeywords": ["React"],
            "missingKeywords": ["SaaS"],
            "notes": "Good coverage.",
        },
        "sectionReviews": [
            {"section": "Experience", "score": 86, "feedback": "Relevant."}
        ],
        "bulletImprovements": [
            {
                "original": "Built APIs.",
                "improved": "Built FastAPI services.",
                "reason": "More specific.",
            }
        ],
        "recommendations": ["Add a targeted summary."],
    }
)


class FakeGeminiService(GeminiService):
    def __init__(self) -> None:
        pass

    async def review_resume(self, resume_text: str, job_description: str):
        assert resume_text
        assert job_description
        return VALID_RESULT


def test_review_endpoint_success_with_mocked_gemini(monkeypatch):
    monkeypatch.setattr("app.services.review_service.GeminiService", FakeGeminiService)
    client = TestClient(app)

    response = client.post(
        "/api/review",
        data={
            "resume_text": "React TypeScript Python FastAPI Pydantic pytest " * 2,
            "job_description": "Full-stack engineer role requiring React TypeScript Python FastAPI testing accessibility product collaboration and reliable APIs.",
        },
    )

    assert response.status_code == 200
    assert response.json()["success"] is True
    assert response.json()["data"]["overallScore"] == 88


def test_review_endpoint_failure_for_short_job_description(monkeypatch):
    monkeypatch.setattr("app.services.review_service.GeminiService", FakeGeminiService)
    client = TestClient(app)

    response = client.post(
        "/api/review",
        data={
            "resume_text": "React TypeScript Python FastAPI Pydantic pytest " * 2,
            "job_description": "Too short",
        },
    )

    assert response.status_code == 400
    assert response.json() == {
        "success": False,
        "error": {
            "code": "INVALID_INPUT",
            "message": "Job description must be at least 100 characters.",
        },
    }
