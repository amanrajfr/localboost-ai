# LocalBoost AI

AI-powered mobile app to help local businesses improve their online presence and grow through smart, automated marketing tools.

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy (async), SQLite (dev) / PostgreSQL (prod)
- **Frontend:** React Native (Expo SDK 54), TypeScript, Expo Router
- **Auth:** JWT + Google OAuth
- **Design:** Inter font, custom design system

## Project Structure

```
localboost-ai/
├── backend/
│   ├── app/
│   │   ├── auth/          # Authentication (login, signup, Google OAuth)
│   │   ├── config.py      # App configuration (env-based)
│   │   ├── database.py    # Async DB engine & session
│   │   ├── main.py        # FastAPI entrypoint
│   │   ├── models.py      # SQLAlchemy models
│   │   └── schemas.py     # Pydantic schemas
│   ├── .env.example
│   └── requirements.txt
│
├── mobile/
│   ├── app/               # Expo Router screens
│   │   ├── index.tsx      # Splash screen
│   │   ├── onboarding.tsx # 3-slide onboarding
│   │   ├── (auth)/        # Login & Sign Up
│   │   └── (main)/        # Home (authenticated)
│   ├── services/api.ts    # Axios API client
│   ├── context/AuthContext.tsx  # Auth state management
│   ├── constants/theme.ts # Design tokens
│   └── package.json
│
└── README.md
```

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
copy .env.example .env       # Windows (cp on macOS/Linux)
uvicorn app.main:app --reload
```

API: **http://127.0.0.1:8000** | Docs: **/docs**

### Mobile App

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone to preview.

## App Flow

1. **Splash** → Animated logo on blue gradient
2. **Onboarding** → 3 swipeable slides introducing features
3. **Sign Up / Login** → Email + password (Google OAuth placeholder)
4. **Home** → Personalized welcome + action cards

## License

MIT
