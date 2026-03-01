"""AI Insights service — aggregate review data + AI recommendations."""

import os
import httpx
from typing import List
from collections import Counter
import re


STOP_WORDS = {
    "the", "and", "is", "it", "a", "of", "to", "in", "was", "this",
    "my", "i", "for", "me", "very", "they", "but", "we", "that", "so",
    "be", "he", "she", "our", "have", "had", "with", "at", "by", "on",
    "are", "were", "all", "an", "as", "not", "or", "from", "than",
    "their", "will", "would", "could", "did", "do", "been", "has",
    "up", "out", "if", "about", "who", "get", "got", "just", "no", "your",
    "you", "his", "her", "its", "more", "also", "can", "when",
}


def extract_keywords(review_texts: List[str], top_n: int = 8) -> List[str]:
    """Extract the most common meaningful words from all reviews."""
    words = []
    for text in review_texts:
        tokens = re.findall(r"\b[a-z]{4,}\b", text.lower())
        words.extend([w for w in tokens if w not in STOP_WORDS])
    counter = Counter(words)
    return [word for word, _ in counter.most_common(top_n)]


def compute_trend(ratings: List[int]) -> str:
    """Return 'improving', 'declining', or 'stable' based on recent vs older ratings."""
    if len(ratings) < 2:
        return "stable"
    mid = len(ratings) // 2
    older_avg = sum(ratings[mid:]) / len(ratings[mid:])
    newer_avg = sum(ratings[:mid]) / len(ratings[:mid])
    if newer_avg > older_avg + 0.3:
        return "improving"
    elif newer_avg < older_avg - 0.3:
        return "declining"
    return "stable"


def compute_score(avg_rating: float, total_reviews: int) -> int:
    """Compute a 0-100 score weighted by average rating and review volume."""
    rating_score = (avg_rating / 5.0) * 70  # 70% weight on rating
    volume_score = min(total_reviews / 20, 1.0) * 30  # 30% weight on volume
    return round(rating_score + volume_score)


async def generate_ai_insights(
    business_name: str,
    avg_rating: float,
    total_reviews: int,
    trend: str,
    keywords: List[str],
) -> str:
    groq_key = os.getenv("GROQ_API_KEY", "")
    prompt = (
        f"You are a local business marketing advisor. Analyze this data for '{business_name}':\n"
        f"- Average rating: {avg_rating:.1f}/5\n"
        f"- Total reviews: {total_reviews}\n"
        f"- Trend: {trend}\n"
        f"- Top mentioned aspects: {', '.join(keywords)}\n\n"
        "Write a single concise paragraph (max 80 words) with actionable advice to help this business improve "
        "their local online presence and get more 5-star reviews. Be specific, positive, and practical."
    )

    if groq_key:
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                resp = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {groq_key}", "Content-Type": "application/json"},
                    json={
                        "model": "llama3-8b-8192",
                        "messages": [{"role": "user", "content": prompt}],
                        "max_tokens": 120,
                        "temperature": 0.7,
                    },
                )
                if resp.status_code == 200:
                    return resp.json()["choices"][0]["message"]["content"].strip()
        except Exception:
            pass

    # Smart fallback
    trend_msg = {
        "improving": "Your ratings are on an upward trajectory — keep building on this momentum.",
        "declining": "Your recent ratings show a dip — focus on your most-mentioned pain points.",
        "stable": "Your ratings are consistent — a great foundation to push for growth.",
    }.get(trend, "")

    return (
        f"{trend_msg} With an average of {avg_rating:.1f} stars across {total_reviews} reviews, "
        f"customers frequently highlight {', '.join(keywords[:3]) if keywords else 'your service'}. "
        "Consider following up with satisfied customers to leave a review and respond personally "
        "to all reviews — this significantly boosts your Google Maps ranking."
    )
