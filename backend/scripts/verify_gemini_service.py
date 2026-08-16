import asyncio
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.services.gemini_service import GeminiService


SAMPLE_RESUME = """
Jordan Lee
Full-Stack Software Engineer

Experience
Software Engineer, BrightCart
- Built React and TypeScript checkout workflows used by thousands of weekly
  shoppers.
- Developed FastAPI services for product search, order validation, and internal
  operations dashboards.
- Improved API response reliability by adding Pydantic validation, request
  logging, and integration tests.
- Collaborated with product and design partners to refine UX for account and
  checkout flows.

Skills
React, TypeScript, Python, FastAPI, REST APIs, Pydantic, pytest, Tailwind CSS,
GitHub Actions, accessibility, API design
"""

SAMPLE_JOB_DESCRIPTION = """
We are hiring a Full-Stack Engineer to build customer-facing SaaS workflows.
The role requires strong React and TypeScript experience, Python API development
with FastAPI or a similar framework, comfort creating accessible and responsive
interfaces, and experience validating backend contracts. The engineer will work
closely with product designers, write tests, improve reliability, and translate
business requirements into polished user experiences. Familiarity with Tailwind,
CI pipelines, and structured API schemas is preferred.
"""


async def main() -> None:
    result = await GeminiService().review_resume(
        resume_text=SAMPLE_RESUME,
        job_description=SAMPLE_JOB_DESCRIPTION,
    )
    print(result.model_dump_json(indent=2))


if __name__ == "__main__":
    asyncio.run(main())
