"""Business profile API router."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import User
from app.schemas import BusinessCreate, BusinessUpdate, BusinessResponse
from app.auth.dependencies import get_current_user
from app.business.service import (
    get_business_by_user,
    create_business,
    update_business,
    seed_mock_reviews,
)

router = APIRouter(prefix="/api/v1/business", tags=["business"])


@router.get("/me", response_model=BusinessResponse)
async def get_my_business(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    business = await get_business_by_user(db, user.id)
    if not business:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No business profile found")
    return business


@router.post("", response_model=BusinessResponse, status_code=status.HTTP_201_CREATED)
async def create_my_business(
    body: BusinessCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    existing = await get_business_by_user(db, user.id)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Business profile already exists")

    business = await create_business(db, user.id, body.model_dump())
    # Seed mock reviews so the dashboard has data immediately
    await seed_mock_reviews(db, business.id)
    return business


@router.put("/me", response_model=BusinessResponse)
async def update_my_business(
    body: BusinessUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    business = await get_business_by_user(db, user.id)
    if not business:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No business profile found")

    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    return await update_business(db, business, updates)
