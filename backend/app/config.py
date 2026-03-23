import os

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
IMAGE_MODEL = os.getenv("IMAGE_MODEL", "dall-e-3")
IMAGE_SIZE = os.getenv("IMAGE_SIZE", "1024x1024")
IMAGE_QUALITY = os.getenv("IMAGE_QUALITY", "standard")

# Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# MinIO
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "iagentekminioback.iagentek.com.mx")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY", "admin")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY", "Iagentek_123")
MINIO_BUCKET = os.getenv("MINIO_BUCKET", "imgstudio")
MINIO_USE_SSL = os.getenv("MINIO_USE_SSL", "true").lower() == "true"
MINIO_PUBLIC_URL = os.getenv("MINIO_PUBLIC_URL", "https://iagentekminioback.iagentek.com.mx")

# Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://iagenteksupabase.iagentek.com.mx")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")

# CORS
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:4200").split(",")
