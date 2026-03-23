import httpx
from .config import SUPABASE_URL, SUPABASE_SERVICE_KEY

_headers = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
    "Content-Type": "application/json",
}

TABLE = "iagentek_imgstudio_images"


def insert_image(data: dict) -> dict | None:
    r = httpx.post(
        f"{SUPABASE_URL}/rest/v1/{TABLE}",
        headers={**_headers, "Prefer": "return=representation"},
        json=data,
        verify=False,
    )
    if r.status_code == 201:
        return r.json()[0]
    return None


def get_images_by_session(session_id: str) -> list:
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/{TABLE}",
        headers=_headers,
        params={"session_id": f"eq.{session_id}", "order": "created_at.desc"},
        verify=False,
    )
    return r.json() if r.status_code == 200 else []


def get_image(image_id: str) -> dict | None:
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/{TABLE}",
        headers=_headers,
        params={"id": f"eq.{image_id}", "select": "*"},
        verify=False,
    )
    rows = r.json() if r.status_code == 200 else []
    return rows[0] if rows else None


def delete_image(image_id: str) -> bool:
    r = httpx.delete(
        f"{SUPABASE_URL}/rest/v1/{TABLE}",
        headers=_headers,
        params={"id": f"eq.{image_id}"},
        verify=False,
    )
    return r.status_code in (200, 204)
