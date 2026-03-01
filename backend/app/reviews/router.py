"""Reviews API router."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.database import get_db
from app.models import User, Review
from app.schemas import ReviewResponse, ReviewRespondRequest
from app.auth.dependencies import get_current_user
from app.business.service import get_business_by_user

router = APIRouter(prefix="/api/v1/reviews", tags=["reviews"])


@router.get("", response_model=List[ReviewResponse])
async def list_reviews(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    business = await get_business_by_user(db, user.id)
    if not business:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No business profile found. Create one first.")

    result = await db.execute(
        select(Review)
        .where(Review.business_id == business.id)
        .order_by(Review.created_at.desc())
    )
    return result.scalars().all()


@router.post("/{review_id}/respond", response_model=ReviewResponse)
async def respond_to_review(
    review_id: str,
    body: ReviewRespondRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    business = await get_business_by_user(db, user.id)
    if not business:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No business profile found.")

    result = await db.execute(
        select(Review).where(Review.id == review_id, Review.business_id == business.id)
    )
    review = result.scalar_one_or_none()
    if not review:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")

    # Generate AI response
    from app.reviews.service import generate_ai_response
    ai_response = await generate_ai_response(
        business_name=business.name,
        reviewer_name=review.author,
        review_text=review.text,
        rating=review.rating,
        custom_context=body.custom_context,
    )

    review.ai_response = ai_response
    await db.flush()
    await db.refresh(review)
    return review
