"""Quick API smoke test for LocalBoost AI backend."""
import urllib.request
import urllib.error
import json
import sys

BASE = "http://localhost:8000"

def post(path, data):
    body = json.dumps(data).encode()
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=body,
        headers={"Content-Type": "application/json"},
    )
    try:
        resp = urllib.request.urlopen(req)
        return json.loads(resp.read()), resp.status
    except urllib.error.HTTPError as e:
        return json.loads(e.read()), e.code

def get(path, token=None):
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(f"{BASE}{path}", headers=headers)
    try:
        resp = urllib.request.urlopen(req)
        return json.loads(resp.read()), resp.status
    except urllib.error.HTTPError as e:
        return json.loads(e.read()), e.code

print("=" * 50)
print("LocalBoost AI — API Smoke Test")
print("=" * 50)

# 1. Health check
print("\n1. GET / (health check)")
data, status = get("/")
print(f"   Status: {status} | Response: {data}")

# 2. Register
print("\n2. POST /api/v1/auth/register")
data, status = post("/api/v1/auth/register", {
    "name": "Test User",
    "email": "smoketest@localboost.ai",
    "phone": "9876543210",
    "password": "testpass123",
})
print(f"   Status: {status} | Response: {data}")
token = data.get("access_token")

if status == 409:
    # Already registered, login instead
    print("   -> Already registered, trying login...")
    data, status = post("/api/v1/auth/login", {
        "email": "smoketest@localboost.ai",
        "password": "testpass123",
    })
    print(f"   Status: {status} | Response: {data}")
    token = data.get("access_token")

# 3. Get current user
if token:
    print("\n3. GET /api/v1/auth/me (with JWT)")
    data, status = get("/api/v1/auth/me", token)
    print(f"   Status: {status} | Response: {data}")
else:
    print("\n3. SKIPPED — no token")

# 4. Login
print("\n4. POST /api/v1/auth/login")
data, status = post("/api/v1/auth/login", {
    "email": "smoketest@localboost.ai",
    "password": "testpass123",
})
print(f"   Status: {status} | Response: {data}")

# 5. Login with wrong password
print("\n5. POST /api/v1/auth/login (wrong password)")
data, status = post("/api/v1/auth/login", {
    "email": "smoketest@localboost.ai",
    "password": "wrongpassword",
})
print(f"   Status: {status} | Response: {data}")

print("\n" + "=" * 50)
print("All tests complete!")
print("=" * 50)
