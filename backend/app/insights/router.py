"""AI Insights API router."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models import User, Review
from app.schemas import InsightsResponse
from app.auth.dependencies import get_current_user
from app.business.service import get_business_by_user
from app.insights.service import (
    extract_keywords,
    compute_trend,
    compute_score,
    generate_ai_insights,
)

router = APIRouter(prefix="/api/v1/insights", tags=["insights"])


@router.get("", response_model=InsightsResponse)
async def get_insights(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    business = await get_business_by_user(db, user.id)
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No business profile found. Create one first.",
        )

    result = await db.execute(
        select(Review)
        .where(Review.business_id == business.id)
        .order_by(Review.created_at.desc())
    )
    reviews = result.scalars().all()

    if not reviews:
        return InsightsResponse(
            overall_score=0,
            review_trend="stable",
            avg_rating=0.0,
            total_reviews=0,
            top_keywords=[],
            ai_suggestion="No reviews yet. Start by asking your happy customers to leave a review on Google!",
        )

    ratings = [r.rating for r in reviews]
    texts = [r.text for r in reviews]
    avg_rating = round(sum(ratings) / len(ratings), 1)
    trend = compute_trend(ratings)
    score = compute_score(avg_rating, len(ratings))
    keywords = extract_keywords(texts)

    ai_suggestion = await generate_ai_insights(
        business_name=business.name,
        avg_rating=avg_rating,
        total_reviews=len(reviews),
        trend=trend,
        keywords=keywords,
    )

    return InsightsResponse(
        overall_score=score,
        review_trend=trend,
        avg_rating=avg_rating,
        total_reviews=len(reviews),
        top_keywords=keywords,
        ai_suggestion=ai_suggestion,
    )
