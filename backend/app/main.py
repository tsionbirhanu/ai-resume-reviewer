import os
from urllib.parse import urlparse

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.api.routes.review import router as review_router
from app.core.config import settings
from app.middleware.error_handler import register_exception_handlers


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name)
    register_exception_handlers(app)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=get_allowed_origins(settings.frontend_url),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health_router, prefix="/api")
    app.include_router(review_router, prefix="/api")
    return app


def get_allowed_origins(frontend_url: str) -> list[str]:
    parsed = urlparse(frontend_url)
    scheme = parsed.scheme or "http"
    port = f":{parsed.port}" if parsed.port else ""
    configured_origin = f"{scheme}://{parsed.hostname}{port}" if parsed.hostname else frontend_url
    origins = {configured_origin}

    if parsed.hostname in {"localhost", "127.0.0.1", "::1"}:
        origins.update(
            {
                f"{scheme}://localhost{port}",
                f"{scheme}://127.0.0.1{port}",
                f"{scheme}://[::1]{port}",
            }
        )

    return sorted(origins)


app = create_app()


if __name__ == "__main__":
    port = int(os.getenv("PORT", settings.port))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
