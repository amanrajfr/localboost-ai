"""Business profile CRUD service."""

import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models import Business, Review


async def get_business_by_user(db: AsyncSession, user_id: str) -> Business | None:
    result = await db.execute(select(Business).where(Business.user_id == user_id))
    return result.scalar_one_or_none()


async def create_business(db: AsyncSession, user_id: str, data: dict) -> Business:
    business = Business(id=str(uuid.uuid4()), user_id=user_id, **data)
    db.add(business)
    await db.flush()
    await db.refresh(business)
    return business


async def update_business(db: AsyncSession, business: Business, data: dict) -> Business:
    for key, value in data.items():
        if value is not None:
            setattr(business, key, value)
    await db.flush()
    await db.refresh(business)
    return business


async def seed_mock_reviews(db: AsyncSession, business_id: str) -> None:
    """Seed realistic mock reviews so the Reviews screen has data immediately."""
    mock_reviews = [
        {
            "author": "Priya Mehta",
            "rating": 5,
            "text": "Absolutely love this place! The service was outstanding and the team was incredibly professional. Will definitely be coming back!",
            "date": "2026-02-20",
        },
        {
            "author": "Rahul Sharma",
            "rating": 4,
            "text": "Great experience overall. A small wait time but the quality made it worth every minute. Staff was friendly and helpful.",
            "date": "2026-02-15",
        },
        {
            "author": "Ananya Patel",
            "rating": 5,
            "text": "Best local business I've used in years. Highly recommend to anyone in the area looking for top-notch quality.",
            "date": "2026-02-10",
        },
        {
            "author": "Vikram Singh",
            "rating": 3,
            "text": "Decent service. Nothing exceptional, but got the job done. The pricing felt a bit high for what was offered.",
            "date": "2026-02-05",
        },
        {
            "author": "Sneha Nair",
            "rating": 5,
            "text": "Exceeded my expectations in every way. Responsive, professional, and genuinely cared about the outcome. 10/10!",
            "date": "2026-01-28",
        },
    ]
    for r in mock_reviews:
        review = Review(
            id=str(uuid.uuid4()),
            business_id=business_id,
            **r,
        )
        db.add(review)
    await db.flush()
