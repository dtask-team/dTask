# 🛠️ dTask — Decentralized Freelance Platform

**dTask** is a full-stack decentralized freelance marketplace that leverages blockchain technology (Polygon), smart contracts (Hardhat), decentralized storage (IPFS), and the modern **MERN** stack (MongoDB, Express, React, Node.js). It ensures **trustless collaboration** between clients and freelancers with **built-in escrow**, **dispute resolution**, and **on-chain reputation tracking**.

---

## 🧭 Introduction

Welcome to **dTask** – your decentralized alternative to platforms like Fiverr or Upwork.  
Say goodbye to high fees, regional payment issues, and centralized dispute handling. Whether you're a solo freelancer or a global client, dTask simplifies freelance engagement through secure blockchain automation.

---

## ✨ Features

### 🔐 Wallet-Based Authentication
- Login via **MetaMask** or **WalletConnect**
- No email or password required

### 👤 Client Side
- Post jobs with task details and escrow payment
- Approve or dispute submitted work
- Funds are released **only upon approval** or **DAO vote**

### 💼 Freelancer Functionality
- Browse and accept open tasks
- Upload completed work to **IPFS**
- Earn **non-transferable NFTs** as verifiable success proof

### ⚖️ Dispute Resolution
- DAO-based voting system for conflicts
- Fully **transparent** and **community-governed**

### 🧬 Reputation System
- **Soulbound NFTs** awarded for successful task completion
- On-chain, tamper-proof **freelancer reputation**

---

## 🔁 Demo Flow

1. 🧑‍💼 Client logs in and posts a task  
2. 👩‍💻 Freelancer accepts and applies to the task  
3. 📝 Freelancer submits the completed work to IPFS  
4. ✅ Client either approves or disputes the task  
5. 🗳 DAO votes if there's a dispute  
6. 🏅 Freelancer earns an NFT upon successful resolution

---

## 🧰 Technologies Used

### 🖥 Frontend
- React.js
- Vite
- Tailwind CSS
- wagmi
- RainbowKit

### 🛠 Backend
- Node.js
- Express
- MongoDB
- IPFS via [web3.storage](https://web3.storage/)

### ⛓ Blockchain
- Solidity
- Hardhat
- BlockDAG Testnet (Primordial)
- Alchemy RPC


## 🛠 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v6.14.6 or higher)
- MongoDB (Atlas or local)
- MetaMask browser extension

---

## ⚙️ Environment Setup

### 🔵 1. Backend Setup

```bash
cd backend
npm install
npm run dev
This will start your Express + MongoDB server on http://localhost:4000.
```
### 🔵 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev 
REACT_APP_API_URL=http://localhost:4000
```
### 🔵 3. Blockchain Setup
```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost




