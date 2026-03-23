import uuid
import base64
from openai import OpenAI
from .celery_app import celery
from .config import OPENAI_API_KEY, IMAGE_MODEL, IMAGE_SIZE, IMAGE_QUALITY
from .storage import upload_image
from .database import insert_image

client = OpenAI(api_key=OPENAI_API_KEY)


@celery.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_image_task(self, prompt: str, session_id: str):
    try:
        self.update_state(state="GENERATING", meta={"prompt": prompt})

        response = client.images.generate(
            model=IMAGE_MODEL,
            prompt=prompt,
            n=1,
            size=IMAGE_SIZE,
            quality=IMAGE_QUALITY,
            response_format="b64_json",
        )

        b64 = response.data[0].b64_json
        if not b64:
            raise ValueError("No image data received from OpenAI")

        image_bytes = base64.b64decode(b64)
        image_id = str(uuid.uuid4())
        file_path = f"images/{image_id}.png"

        self.update_state(state="UPLOADING", meta={"prompt": prompt})

        # Upload to MinIO
        public_url = upload_image(file_path, image_bytes)

        # Save metadata to Supabase
        record = insert_image({
            "id": image_id,
            "prompt": prompt,
            "file_path": file_path,
            "file_size": len(image_bytes),
            "session_id": session_id,
        })

        return {
            "id": image_id,
            "url": public_url,
            "prompt": prompt,
            "created_at": record["created_at"] if record else None,
        }

    except Exception as exc:
        if self.request.retries < self.max_retries:
            raise self.retry(exc=exc)
        raise
