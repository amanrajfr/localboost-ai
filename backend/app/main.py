"""FastAPI application entry point."""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from starlette.responses import Response
from starlette.middleware.base import BaseHTTPMiddleware

from app.config import get_settings
from app.database import create_tables
from app.auth.router import router as auth_router
from app.business.router import router as business_router
from app.reviews.router import router as reviews_router
from app.insights.router import router as insights_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    lifespan=lifespan,
)


# Manual CORS middleware — Starlette CORSMiddleware was not adding headers
class CORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            response = Response(status_code=200)
        else:
            response = await call_next(request)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Accept"
        response.headers["Access-Control-Max-Age"] = "600"
        return response

app.add_middleware(CORSMiddleware)

# Register all routers
app.include_router(auth_router)
app.include_router(business_router)
app.include_router(reviews_router)
app.include_router(insights_router)


@app.get("/")
async def root():
    return {"app": settings.APP_NAME, "status": "running"}
