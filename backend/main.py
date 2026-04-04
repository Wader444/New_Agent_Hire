from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

app = FastAPI(title="AgentHire API", version="2.0.0")

# ─── CORS ───────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Blockchain Node.js server URL ──────────────────────
BLOCKCHAIN_URL = os.getenv("BLOCKCHAIN_URL", "http://localhost:3000")

# 🔹 Freelancer data (with Algorand wallet addresses)
freelancers = [
    {
        "name": "John",
        "skills": ["react", "frontend"],
        "rating": 4.8,
        "experience": 3,
        "wallet": None,  # Will be auto-generated if None
    },
    {
        "name": "Alice",
        "skills": ["backend", "node"],
        "rating": 4.6,
        "experience": 4,
        "wallet": None,
    },
    {
        "name": "Bob",
        "skills": ["react", "ui"],
        "rating": 4.7,
        "experience": 2,
        "wallet": None,
    },
]


@app.get("/")
def home():
    return {"message": "AgentHire Backend running 🚀", "blockchain": BLOCKCHAIN_URL}


# ─── Health check (includes blockchain status) ──────────
@app.get("/health")
async def health():
    """Check backend + blockchain health."""
    blockchain_status = "unknown"
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(f"{BLOCKCHAIN_URL}/api/health")
            if resp.status_code == 200:
                blockchain_status = resp.json()
            else:
                blockchain_status = {"status": "unhealthy", "code": resp.status_code}
    except Exception as e:
        blockchain_status = {"status": "unreachable", "error": str(e)}

    return {
        "backend": "healthy",
        "blockchain": blockchain_status,
    }


# ─── AI Recommendation Logic ────────────────────────────
def recommend_freelancer(project_desc: str):
    best = None
    best_score = 0

    for f in freelancers:
        score = 0

        # Skill match
        desc_lower = project_desc.lower()
        for skill in f["skills"]:
            if skill in desc_lower:
                score += 5

        # Add rating & experience
        score += f["rating"]
        score += f["experience"]

        if score > best_score:
            best_score = score
            best = f

    return best, best_score


@app.post("/recommend")
def recommend(data: dict):
    """AI-powered freelancer recommendation."""
    if "description" not in data:
        return {"error": "description is required"}

    result, score = recommend_freelancer(data["description"])

    if result is None:
        return {"error": "No freelancers available"}

    return {
        "recommended_freelancer": result["name"],
        "rating": result["rating"],
        "experience": result["experience"],
        "match_score": score,
        "has_wallet": result.get("wallet") is not None,
    }


# ─── HIRE: Real Blockchain Payment ──────────────────────
@app.post("/hire")
async def hire(data: dict):
    """
    Hire a freelancer and pay them via Algorand blockchain.

    Expected body:
    {
        "freelancer": "John",
        "amount": 200000     # optional, defaults to 0.2 ALGO
    }
    """
    if "freelancer" not in data:
        return {"error": "freelancer name required"}

    freelancer_name = data["freelancer"]
    amount = data.get("amount", 200000)  # Default 0.2 ALGO in microAlgos

    # Find the freelancer
    freelancer = next((f for f in freelancers if f["name"] == freelancer_name), None)
    if not freelancer:
        return {"error": f"Freelancer '{freelancer_name}' not found"}

    # Get or generate a wallet address for the freelancer
    receiver_address = freelancer.get("wallet")

    if not receiver_address:
        # Auto-generate a receiver address via blockchain service
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                gen_resp = await client.post(f"{BLOCKCHAIN_URL}/api/account/generate")
                if gen_resp.status_code == 200:
                    gen_data = gen_resp.json()
                    receiver_address = gen_data.get("address")
                    freelancer["wallet"] = receiver_address
                else:
                    return {
                        "error": "Failed to generate wallet for freelancer",
                        "detail": gen_resp.text,
                    }
        except Exception as e:
            return {"error": f"Blockchain service unreachable: {str(e)}"}

    # Execute the blockchain payment
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            pay_resp = await client.post(
                f"{BLOCKCHAIN_URL}/api/payment/send",
                json={
                    "receiver": receiver_address,
                    "amount": amount,
                },
            )
            pay_data = pay_resp.json()

        if pay_data.get("success"):
            return {
                "message": f"{freelancer_name} hired successfully!",
                "payment": {
                    "tx_id": pay_data.get("txId"),
                    "confirmed_round": pay_data.get("confirmedRound"),
                    "amount": pay_data.get("amount"),
                    "amount_algo": pay_data.get("amountAlgo"),
                    "explorer": pay_data.get("explorer"),
                },
                "freelancer": {
                    "name": freelancer_name,
                    "wallet": receiver_address,
                },
            }
        else:
            return {
                "error": f"Payment failed: {pay_data.get('error', 'Unknown error')}",
                "suggestion": pay_data.get("suggestion"),
                "error_type": pay_data.get("errorType"),
            }

    except httpx.TimeoutException:
        return {"error": "Blockchain payment timed out. Please try again."}
    except Exception as e:
        return {"error": f"Payment error: {str(e)}"}


# ─── Get blockchain account info ────────────────────────
@app.get("/account")
async def get_account():
    """Get the platform's Algorand account info."""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(f"{BLOCKCHAIN_URL}/api/account")
            return resp.json()
    except Exception as e:
        return {"error": f"Blockchain unreachable: {str(e)}"}