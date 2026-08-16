from pathlib import Path
import sys
from tempfile import TemporaryDirectory

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.services.resume_parser_service import extract_text_from_pdf


def build_sample_pdf() -> bytes:
    stream = (
        "BT\n"
        "/F1 12 Tf\n"
        "72 720 Td\n"
        "(Sample Resume Verification) Tj\n"
        "0 -18 Td\n"
        "(Python FastAPI React TypeScript Gemini resume reviewer backend extraction check) Tj\n"
        "ET\n"
    )
    objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        f"<< /Length {len(stream.encode('ascii'))} >>\nstream\n{stream}endstream",
    ]

    pdf = "%PDF-1.4\n"
    offsets = [0]
    for index, body in enumerate(objects, start=1):
        offsets.append(len(pdf.encode("ascii")))
        pdf += f"{index} 0 obj\n{body}\nendobj\n"

    startxref = len(pdf.encode("ascii"))
    pdf += "xref\n"
    pdf += f"0 {len(objects) + 1}\n"
    pdf += "0000000000 65535 f \n"
    for offset in offsets[1:]:
        pdf += f"{offset:010d} 00000 n \n"
    pdf += f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
    pdf += f"startxref\n{startxref}\n%%EOF\n"
    return pdf.encode("ascii")


class LocalUpload:
    filename = "sample-resume.pdf"
    content_type = "application/pdf"

    def __init__(self, path: Path) -> None:
        self.path = path

    async def read(self) -> bytes:
        return self.path.read_bytes()

    async def seek(self, _offset: int) -> None:
        return None


async def main() -> None:
    with TemporaryDirectory() as temp_dir:
        pdf_path = Path(temp_dir) / "sample-resume.pdf"
        pdf_path.write_bytes(build_sample_pdf())
        text = await extract_text_from_pdf(LocalUpload(pdf_path))
        print(f"Extracted text length: {len(text)}")
        print(text)


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
