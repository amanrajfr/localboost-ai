# LocalBoost AI

AI-powered mobile app to help local businesses improve their online presence and grow through smart, automated marketing tools.

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy (async), SQLite (dev) / PostgreSQL (prod)
- **Auth:** JWT + Google OAuth
- **Frontend:** *(coming soon — React Native / Flutter)*

## Project Structure

```
localboost-ai/
├── backend/
│   ├── app/
│   │   ├── auth/          # Authentication module (login, signup, Google OAuth)
│   │   ├── config.py      # App configuration (env-based)
│   │   ├── database.py    # Async DB engine & session
│   │   ├── main.py        # FastAPI entrypoint
│   │   ├── models.py      # SQLAlchemy models
│   │   └── schemas.py     # Pydantic schemas
│   ├── .env.example        # Example environment variables
│   └── requirements.txt    # Python dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.11+

### Setup

```bash
# Clone the repo
git clone https://github.com/<your-username>/localboost-ai.git
cd localboost-ai/backend

# Create a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env       # Windows
# cp .env.example .env       # macOS / Linux
# Edit .env with your values

# Run the server
uvicorn app.main:app --reload
```

The API will be available at **http://127.0.0.1:8000** and docs at **/docs**.

## License

MIT
