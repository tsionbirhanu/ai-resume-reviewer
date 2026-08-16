# AI Resume Reviewer Backend

FastAPI backend for the AI Resume Reviewer MVP.

## Local Setup

Create and activate a virtual environment from the `backend/` directory:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Run the API:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
