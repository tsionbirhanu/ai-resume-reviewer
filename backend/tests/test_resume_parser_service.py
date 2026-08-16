from pathlib import Path

import pytest
from fastapi import UploadFile

from app.core.exceptions import InvalidInputError, UnusableTextError
from app.services.resume_parser_service import extract_text_from_pdf
from scripts.verify_pdf_extraction import build_sample_pdf


def make_upload(tmp_path: Path, content: bytes, filename: str = "resume.pdf") -> UploadFile:
    path = tmp_path / filename
    path.write_bytes(content)
    return UploadFile(file=path.open("rb"), filename=filename, headers={"content-type": "application/pdf"})


@pytest.mark.asyncio
async def test_extract_text_from_valid_pdf(tmp_path):
    upload = make_upload(tmp_path, build_sample_pdf())

    text = await extract_text_from_pdf(upload)

    assert "Sample Resume Verification" in text
    assert len(text) > 50


@pytest.mark.asyncio
async def test_extract_text_rejects_corrupt_pdf(tmp_path):
    upload = make_upload(tmp_path, b"not a pdf")

    with pytest.raises(InvalidInputError):
        await extract_text_from_pdf(upload)


@pytest.mark.asyncio
async def test_extract_text_rejects_near_empty_pdf(tmp_path):
    # A syntactically valid PDF with no text should route to the unusable-text path.
    upload = make_upload(tmp_path, b"%PDF-1.4\n%%EOF\n")

    with pytest.raises((InvalidInputError, UnusableTextError)):
        await extract_text_from_pdf(upload)
