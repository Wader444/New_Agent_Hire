# 🚀 AgentHire – AI Freelance Hiring Platform

![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)
![Backend](https://img.shields.io/badge/Backend-FastAPI-green)
![Blockchain](https://img.shields.io/badge/Blockchain-Algorand-blue)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 🎯 Project Overview

AgentHire is an AI-powered platform that helps clients find the best freelancer and securely pay them using blockchain.

---

## ✨ Features

* 🤖 AI-based freelancer recommendation
* ⚡ Fast backend using FastAPI
* ⛓ Secure payments via Algorand blockchain
* 🔗 End-to-end hiring flow

---

## 🧠 Core MVP

**AI Freelancer Selection + Blockchain Payment**

```text
Client → AI Recommendation → Hire → Blockchain Payment → TX ID
```

---
deployment fix

## 🏗 Tech Stack

| Layer      | Technology          |
| ---------- | ------------------- |
| Frontend   | React (in progress) |
| Backend    | FastAPI (Python)    |
| Blockchain | Algorand (Testnet)  |
| AI Logic   | Rule-based scoring  |

---

## 📡 API Endpoints

### 🔹 POST /recommend

```json
{
  "description": "Need React developer"
}
```

Response:

```json
{
  "recommended_freelancer": "John",
  "rating": 4.8,
  "experience": 3,
  "match_score": 12.8
}
```

---

### 🔹 POST /hire

```json
{
  "freelancer": "John"
}
```

Response:

```json
{
  "message": "John hired successfully",
  "tx_id": "TXNJOHN123"
}
```

---

## 🧩 Project Structure

```bash
AgentHire/
├── frontend/
├── backend/
│   └── main.py
├── blockchain/
└── README.md
```

---

## 🔗 System Flow

```text
Frontend → Backend → AI Logic → Blockchain → Transaction ID → UI
```

---

## ⚠️ Current Status

* ✅ Backend completed
* 🔄 Frontend integration in progress
* 🔄 Blockchain integration in progress

---

## 🎬 Demo Flow (For Judges)

1. Enter project description
2. AI recommends best freelancer
3. Click "Hire"
4. Blockchain transaction executed
5. Transaction ID displayed

---

## 👥 Team Roles

* 🎨 Frontend: UI & API integration
* 🧠 Backend: AI logic & APIs
* ⛓ Blockchain: Payment & smart contract

---

## 🔥 Future Improvements

* 🤖 LLM-based AI matching
* 🔐 Secure escrow release system
* 🗄 Freelancer database
* 🔑 Authentication system

---

## ⭐ Support

If you like this project, consider giving it a star ⭐
