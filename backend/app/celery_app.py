from celery import Celery
from .config import REDIS_URL

celery = Celery(
    "imgstudio",
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=["app.tasks"],
)

celery.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    result_expires=7200,  # 2 hours
    task_soft_time_limit=120,
    task_time_limit=180,
)
