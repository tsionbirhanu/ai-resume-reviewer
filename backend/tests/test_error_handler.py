import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field

from app.core.exceptions import (
    AIProviderError,
    InvalidInputError,
    PayloadTooLargeError,
    UnusableTextError,
)
from app.middleware.error_handler import register_exception_handlers


class Body(BaseModel):
    name: str = Field(min_length=3)


@pytest.fixture
def client():
    app = FastAPI()
    register_exception_handlers(app)

    @app.get("/invalid")
    def invalid():
        raise InvalidInputError("Invalid input.")

    @app.get("/large")
    def large():
        raise PayloadTooLargeError()

    @app.get("/unusable")
    def unusable():
        raise UnusableTextError()

    @app.get("/provider")
    def provider():
        raise AIProviderError()

    @app.get("/unexpected")
    def unexpected():
        raise RuntimeError("private detail")

    @app.post("/validation")
    def validation(_body: Body):
        return {"ok": True}

    return TestClient(app, raise_server_exceptions=False)


@pytest.mark.parametrize(
    ("path", "status", "code"),
    [
        ("/invalid", 400, "INVALID_INPUT"),
        ("/large", 413, "PAYLOAD_TOO_LARGE"),
        ("/unusable", 422, "UNUSABLE_TEXT"),
        ("/provider", 502, "AI_PROVIDER_ERROR"),
        ("/unexpected", 500, "INTERNAL_SERVER_ERROR"),
    ],
)
def test_error_response_shape_for_status_paths(client, path, status, code):
    response = client.get(path)

    assert response.status_code == status
    assert response.json()["success"] is False
    assert response.json()["error"]["code"] == code
    assert "private detail" not in response.text


def test_validation_error_response_shape(client):
    response = client.post("/validation", json={"name": "x"})

    assert response.status_code == 422
    assert response.json() == {
        "success": False,
        "error": {
            "code": "VALIDATION_ERROR",
            "message": "The request could not be validated. Check the submitted fields.",
        },
    }
