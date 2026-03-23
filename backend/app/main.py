from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from celery.result import AsyncResult

from .config import ALLOWED_ORIGINS
from .celery_app import celery
from .tasks import generate_image_task
from .storage import ensure_bucket, s3, MINIO_BUCKET
from .database import get_images_by_session, get_image, delete_image


@asynccontextmanager
async def lifespan(app: FastAPI):
    ensure_bucket()
    yield


app = FastAPI(title="ImageGen Studio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Models ---

class GenerateRequest(BaseModel):
    prompt: str = Field(min_length=5, max_length=1200)
    session_id: str = Field(min_length=1)


class JobResponse(BaseModel):
    job_id: str
    status: str


# --- Endpoints ---

@app.post("/api/generate-image", response_model=JobResponse)
def generate_image(req: GenerateRequest):
    task = generate_image_task.delay(req.prompt, req.session_id)
    return JobResponse(job_id=task.id, status="QUEUED")


@app.get("/api/jobs/{job_id}")
def get_job_status(job_id: str):
    result = AsyncResult(job_id, app=celery)

    if result.state == "PENDING":
        return {"job_id": job_id, "status": "QUEUED"}
    elif result.state in ("GENERATING", "UPLOADING"):
        return {"job_id": job_id, "status": result.state, "meta": result.info}
    elif result.state == "SUCCESS":
        return {"job_id": job_id, "status": "COMPLETED", "result": result.result}
    elif result.state == "FAILURE":
        return {"job_id": job_id, "status": "FAILED", "error": str(result.info)}
    else:
        return {"job_id": job_id, "status": result.state}


@app.get("/api/images")
def list_images(session_id: str = ""):
    if not session_id:
        return []

    rows = get_images_by_session(session_id)
    from .config import MINIO_PUBLIC_URL
    return [
        {
            "id": r["id"],
            "prompt": r["prompt"],
            "url": f"{MINIO_PUBLIC_URL}/{MINIO_BUCKET}/{r['file_path']}",
            "created_at": r["created_at"],
        }
        for r in rows
    ]


@app.delete("/api/images/{image_id}")
def remove_image(image_id: str):
    record = get_image(image_id)
    if not record:
        raise HTTPException(status_code=404, detail="Image not found")

    # Delete from MinIO
    try:
        s3.delete_object(Bucket=MINIO_BUCKET, Key=record["file_path"])
    except Exception:
        pass

    # Delete from Supabase
    delete_image(image_id)
    return {"success": True}


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "imgstudio-api",
        "storage": "minio",
        "database": "supabase",
        "queue": "redis+celery",
    }
