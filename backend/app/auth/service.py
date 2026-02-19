"""Authentication business logic — hashing, JWT, Google token verification."""

from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import JWTError, jwt

from app.config import get_settings

settings = get_settings()

# ── Password hashing ─────────────────────────────────────

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


# ── JWT tokens ────────────────────────────────────────────


def create_access_token(user_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=settings.JWT_EXPIRE_HOURS)
    payload = {"sub": user_id, "exp": expire}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> str | None:
    """Returns user_id or None if invalid."""
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM]
        )
        return payload.get("sub")
    except JWTError:
        return None


# ── Google OAuth ──────────────────────────────────────────


async def verify_google_token(id_token: str) -> dict | None:
    """
    Verify a Google ID token and return user info.
    Returns dict with keys: sub, email, name, picture — or None if invalid.
    Requires GOOGLE_CLIENT_ID to be set in .env.
    """
    if not settings.GOOGLE_CLIENT_ID:
        # For dev: skip verification, return None
        return None

    try:
        from google.oauth2 import id_token as google_id_token
        from google.auth.transport import requests as google_requests

        idinfo = google_id_token.verify_oauth2_token(
            id_token,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )
        return {
            "sub": idinfo["sub"],
            "email": idinfo["email"],
            "name": idinfo.get("name", ""),
        }
    except Exception:
        return None
