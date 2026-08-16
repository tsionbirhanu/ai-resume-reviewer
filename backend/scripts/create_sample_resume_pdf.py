from pathlib import Path

from verify_pdf_extraction import build_sample_pdf


def main() -> None:
    output_path = Path(__file__).resolve().parent / "sample_resume.pdf"
    output_path.write_bytes(build_sample_pdf())
    print(output_path)


if __name__ == "__main__":
    main()
