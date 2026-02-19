"""Pydantic schemas for request/response validation."""

from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, field_validator
import re


# ── Requests ──────────────────────────────────────────────


class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=10)
    password: str = Field(..., min_length=8, max_length=128)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        if not re.match(r"^\d{10}$", v):
            raise ValueError("Phone must be exactly 10 digits")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class GoogleOAuthRequest(BaseModel):
    id_token: str


# ── Responses ─────────────────────────────────────────────


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str
    name: str | None
    email: str
    phone: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
