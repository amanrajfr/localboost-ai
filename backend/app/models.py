"""SQLAlchemy ORM models."""

import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.sqlite import TEXT

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

    def __repr__(self):
        return f"<User {self.email}>"
