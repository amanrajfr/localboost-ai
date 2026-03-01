"""Pydantic schemas for request/response validation."""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, field_validator
import re


# ── Auth ──────────────────────────────────────────────────


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


# ── Business ──────────────────────────────────────────────


class BusinessCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    category: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None


class BusinessUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None


class BusinessResponse(BaseModel):
    id: str
    user_id: str
    name: str
    category: Optional[str]
    address: Optional[str]
    city: Optional[str]
    phone: Optional[str]
    website: Optional[str]
    description: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Reviews ───────────────────────────────────────────────


class ReviewResponse(BaseModel):
    id: str
    business_id: str
    author: str
    rating: int
    text: str
    date: Optional[str]
    ai_response: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class ReviewRespondRequest(BaseModel):
    custom_context: Optional[str] = None


# ── Insights ──────────────────────────────────────────────


class InsightsResponse(BaseModel):
    overall_score: int
    review_trend: str        # "improving", "declining", "stable"
    avg_rating: float
    total_reviews: int
    top_keywords: List[str]
    ai_suggestion: str
