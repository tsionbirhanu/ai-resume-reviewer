import logging

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.exceptions import AppError

logger = logging.getLogger(__name__)


def error_response(status_code: int, code: str, message: str) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "error": {
                "code": code,
                "message": message,
            },
        },
    )


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def handle_app_error(_request: Request, exc: AppError) -> JSONResponse:
        logger.warning("Application error: %s", exc.code)
        return error_response(exc.status_code, exc.code, exc.client_message)

    @app.exception_handler(RequestValidationError)
    async def handle_validation_error(
        _request: Request, _exc: RequestValidationError
    ) -> JSONResponse:
        logger.info("Request validation failed.")
        return error_response(
            422,
            "VALIDATION_ERROR",
            "The request could not be validated. Check the submitted fields.",
        )

    @app.exception_handler(HTTPException)
    async def handle_http_exception(
        _request: Request, exc: HTTPException
    ) -> JSONResponse:
        logger.info("HTTP error response: %s", exc.status_code)
        if exc.status_code == 413:
            return error_response(413, "PAYLOAD_TOO_LARGE", "The request is too large.")
        if exc.status_code == 400:
            return error_response(400, "INVALID_INPUT", "The request is invalid.")
        return error_response(
            exc.status_code,
            "HTTP_ERROR",
            "The request could not be completed.",
        )

    @app.exception_handler(Exception)
    async def handle_unhandled_exception(
        _request: Request, exc: Exception
    ) -> JSONResponse:
        logger.exception("Unhandled server error.")
        return error_response(
            500,
            "INTERNAL_SERVER_ERROR",
            "An unexpected server error occurred.",
        )
