"""SQLAlchemy ORM models."""

import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(15), nullable=True)
    password_hash = Column(String(255), nullable=True)  # Null for OAuth-only users
    name = Column(String(255), nullable=True)
    google_id = Column(String(255), nullable=True, unique=True)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    business = relationship("Business", back_populates="owner", uselist=False)

    def __repr__(self):
        return f"<User {self.email}>"


class Business(Base):
    __tablename__ = "businesses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=True)
    address = Column(String(500), nullable=True)
    city = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    website = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    owner = relationship("User", back_populates="business")
    reviews = relationship("Review", back_populates="business", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Business {self.name}>"


class Review(Base):
    __tablename__ = "reviews"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    business_id = Column(String(36), ForeignKey("businesses.id"), nullable=False)
    author = Column(String(255), nullable=False)
    rating = Column(Integer, nullable=False)   # 1-5
    text = Column(Text, nullable=False)
    date = Column(String(50), nullable=True)
    ai_response = Column(Text, nullable=True)  # AI-generated reply
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    business = relationship("Business", back_populates="reviews")

    def __repr__(self):
        return f"<Review {self.author} {self.rating}star>"
