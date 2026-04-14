# AgentHire - User Manual

Welcome to **AgentHire**, an AI-powered freelance hiring platform that handles recommendations and fast blockchain payouts via Algorand!

This guide will walk you through setting up, running, and using the project locally.

## Prerequisite Checks
1. Ensure you have **Node.js** installed (v18+ recommended)
2. Ensure you have **Python 3.9+** installed
3. Make sure all your dependencies are installed:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && pip install -r requirements.txt`
   - Blockchain: `cd blockchain && npm install`

## 🏃 1. Start the System 

To run the whole stack, you need to open **3 separate terminal windows**.

### Terminal 1: Run the Blockchain Service (Express.js)
This handles the transaction connection to Algorand Testnet.
```bash
cd blockchain
npm run server
```
*Expected Output: "🌐 AlgoPay REST API Server - URL: http://localhost:3000"*

### Terminal 2: Run the Backend Service (FastAPI)
This handles the AI rule-based matching and routes the blockchain logic.
```bash
cd backend
uvicorn main:app --reload --port 8000
```
*Expected Output: "Uvicorn running on http://127.0.0.1:8000"*

### Terminal 3: Run the Frontend (React + Vite)
This runs the web application interface.
```bash
cd frontend
npm run dev
```
*Expected Output: "Local: http://localhost:5173/"*

---

## 💻 2. Using the Platform User Interface

1. **Open your Web Browser** and navigate to: `http://localhost:5173`
2. You will be greeted by the **AgentHire Platform Interface** payment form.
3. The platform will automatically connect to your local backend and check your blockchain settings.

### How to test a transaction:
1. In the **Receiver Address** field, a test address is already pre-filled. You can use it as is. 
   *(Example test receiver: `AX3UQMME6IS4QVKYC6GECWVUD57P7PODIGLPC46XHIKRUGMEYUHEKZKUYM`)*
2. Enter an **Amount** to send (e.g., `0.05` ALGO).
3. Click the **Send Payment / Hire** button.
4. **Wait for Processing:** The app will send the request to the FastAPI backend, which tells the Express server to submit an Algorand Testnet transaction.
5. **Success Notification:** If successful, you will see a green success message along with the official **Transaction ID**. 
6. **Verify on the Explorer:** Click the provided Algorand Explorer link to see your actual transaction live on the blockchain!

---

## ⚙️ 3. Troubleshooting

### "Insufficient Balance" Error
To make a transaction, your sender wallet must have test ALGOs. 
1. Get your active wallet address by running: `curl http://localhost:3000/api/account`
2. Copy the `"address"` value.
3. Visit the [Algorand Testnet Dispenser/Faucet](https://testnet.algoexplorer.io/).
4. Enter your address and request ALGO. 
5. Wait 30 seconds, then try your transaction again!

### "Blockchain unreachable" Error
- Make sure **Terminal 1** (Blockchain network) is active and running on port `3000`.

### "Network Error / Connection Refused" in the Browser
- Make sure **Terminal 2** (FastAPI backend) is active and running on port `8000`.

## Enjoy AgentHire! 🎉
