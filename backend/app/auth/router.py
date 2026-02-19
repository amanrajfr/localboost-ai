"""Auth API endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models import User
from app.schemas import (
    RegisterRequest,
    LoginRequest,
    GoogleOAuthRequest,
    TokenResponse,
    UserResponse,
)
from app.auth.service import (
    hash_password,
    verify_password,
    create_access_token,
    verify_google_token,
)
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


# ── Register ──────────────────────────────────────────────


@router.post("/register", response_model=TokenResponse)
async def register(body: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if email already exists
    existing = await db.execute(select(User).where(User.email == body.email))
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    user = User(
        email=body.email,
        phone=body.phone,
        password_hash=hash_password(body.password),
        name=body.name,
    )
    db.add(user)
    await db.flush()  # Populate user.id
    await db.refresh(user)

    token = create_access_token(user.id)
    return TokenResponse(access_token=token)


# ── Login ─────────────────────────────────────────────────


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == body.email))
    user = result.scalar_one_or_none()

    if not user or not user.password_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(body.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(user.id)
    return TokenResponse(access_token=token)


# ── Google OAuth ──────────────────────────────────────────


@router.post("/google-oauth", response_model=TokenResponse)
async def google_oauth(body: GoogleOAuthRequest, db: AsyncSession = Depends(get_db)):
    google_info = await verify_google_token(body.id_token)
    if google_info is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token (or GOOGLE_CLIENT_ID not configured)",
        )

    # Find existing user by google_id or email
    result = await db.execute(
        select(User).where(
            (User.google_id == google_info["sub"]) | (User.email == google_info["email"])
        )
    )
    user = result.scalar_one_or_none()

    if user:
        # Link Google ID if not already linked
        if not user.google_id:
            user.google_id = google_info["sub"]
    else:
        # Create new user
        user = User(
            email=google_info["email"],
            name=google_info.get("name", ""),
            google_id=google_info["sub"],
        )
        db.add(user)

    await db.flush()
    await db.refresh(user)

    token = create_access_token(user.id)
    return TokenResponse(access_token=token)


# ── Current User ──────────────────────────────────────────


@router.get("/me", response_model=UserResponse)
async def me(user: User = Depends(get_current_user)):
    return user
