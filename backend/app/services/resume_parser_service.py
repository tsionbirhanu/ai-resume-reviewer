from io import BytesIO

from fastapi import UploadFile
from pypdf import PdfReader

from app.core.exceptions import InvalidInputError, PayloadTooLargeError, UnusableTextError

MAX_RESUME_FILE_SIZE_BYTES = 5 * 1024 * 1024
MIN_EXTRACTED_TEXT_LENGTH = 50
PDF_CONTENT_TYPES = {"application/pdf", "application/x-pdf"}


async def extract_text_from_pdf(upload: UploadFile) -> str:
    if upload.content_type not in PDF_CONTENT_TYPES:
        raise InvalidInputError("Resume file must be a PDF.")

    filename = upload.filename or ""
    if not filename.lower().endswith(".pdf"):
        raise InvalidInputError("Resume file must use a .pdf extension.")

    content = await upload.read()
    await upload.seek(0)

    if len(content) > MAX_RESUME_FILE_SIZE_BYTES:
        raise PayloadTooLargeError("Resume PDF must be 5MB or smaller.")

    try:
        reader = PdfReader(BytesIO(content))
        page_text = [(page.extract_text() or "") for page in reader.pages]
    except Exception as exc:
        raise InvalidInputError("Resume PDF could not be read.") from exc

    text = "\n\n".join(part.strip() for part in page_text if part.strip()).strip()
    normalized_text = " ".join(text.split())

    if len(normalized_text) < MIN_EXTRACTED_TEXT_LENGTH:
        raise UnusableTextError(
            "Could not extract enough text from the PDF. Scanned resumes may require OCR."
        )

    return text
