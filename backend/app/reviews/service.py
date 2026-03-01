"""Reviews service — AI response generation."""

import os
import httpx


async def generate_ai_response(
    business_name: str,
    reviewer_name: str,
    review_text: str,
    rating: int,
    custom_context: str | None = None,
) -> str:
    """
    Generate a professional AI reply to a customer review.
    Uses Groq (llama3-8b) if GROQ_API_KEY is set, otherwise returns a smart template.
    """
    groq_key = os.getenv("GROQ_API_KEY", "")

    prompt = f"""You are writing a professional, warm, and concise response on behalf of "{business_name}" to a customer review.

Reviewer: {reviewer_name}
Rating: {rating}/5 stars
Review: "{review_text}"
{f'Additional context: {custom_context}' if custom_context else ''}

Write a response that:
- Thanks the reviewer by name
- Acknowledges their specific feedback
- Is friendly, professional, and under 100 words
- If rating <= 3, apologizes and offers to make it right
- Does NOT use generic phrases like "we appreciate your feedback"

Response:"""

    if groq_key:
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                resp = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {groq_key}", "Content-Type": "application/json"},
                    json={
                        "model": "llama3-8b-8192",
                        "messages": [{"role": "user", "content": prompt}],
                        "max_tokens": 150,
                        "temperature": 0.7,
                    },
                )
                if resp.status_code == 200:
                    return resp.json()["choices"][0]["message"]["content"].strip()
        except Exception:
            pass  # Fall through to template

    # Fallback template when no API key is configured
    if rating >= 4:
        return (
            f"Thank you so much, {reviewer_name}! We're thrilled to hear you had such a wonderful experience at {business_name}. "
            "Your kind words mean a lot to our team and motivate us to keep delivering our best. "
            "We look forward to welcoming you back soon!"
        )
    else:
        return (
            f"Dear {reviewer_name}, thank you for taking the time to share your feedback. "
            f"We're sorry your experience at {business_name} didn't meet your expectations. "
            "We'd love the opportunity to make it right — please reach out to us directly so we can address your concerns personally."
        )
