import boto3
from botocore.config import Config
from .config import (
    MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY,
    MINIO_BUCKET, MINIO_USE_SSL, MINIO_PUBLIC_URL,
)

_protocol = "https" if MINIO_USE_SSL else "http"

s3 = boto3.client(
    "s3",
    endpoint_url=f"{_protocol}://{MINIO_ENDPOINT}",
    aws_access_key_id=MINIO_ACCESS_KEY,
    aws_secret_access_key=MINIO_SECRET_KEY,
    config=Config(signature_version="s3v4"),
    region_name="us-east-1",
)


def ensure_bucket():
    try:
        s3.head_bucket(Bucket=MINIO_BUCKET)
    except Exception:
        s3.create_bucket(Bucket=MINIO_BUCKET)
        # Set public read policy
        import json
        policy = {
            "Version": "2012-10-17",
            "Statement": [{
                "Effect": "Allow",
                "Principal": {"AWS": ["*"]},
                "Action": ["s3:GetObject"],
                "Resource": [f"arn:aws:s3:::{MINIO_BUCKET}/*"],
            }],
        }
        s3.put_bucket_policy(Bucket=MINIO_BUCKET, Policy=json.dumps(policy))


def upload_image(file_path: str, data: bytes) -> str:
    s3.put_object(
        Bucket=MINIO_BUCKET,
        Key=file_path,
        Body=data,
        ContentType="image/png",
    )
    return f"{MINIO_PUBLIC_URL}/{MINIO_BUCKET}/{file_path}"
