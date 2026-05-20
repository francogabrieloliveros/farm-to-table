# 🌾 Farm-to-Table E-Commerce Platform

[![React](https://img.shields.io/badge/Frontend-React%20%7C%20TS%20%7C%20Vite-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Node](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20TS-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%28Mongoose%29-47a248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Infrastructure-Docker%20Compose-2496ed?style=for-the-badge&logo=docker)](https://www.docker.com/)

A premium, enterprise-grade digital marketplace developed for the **Department of Agriculture (DA)**. This initiative bridges the gap between local Filipino agricultural producers and citizens, providing an elegant, transparent, and direct platform for farm-fresh commerce.

---

## 🏗️ System Architecture

The application is structured as a decoupled client-server architecture with state-of-the-art security, asynchronous processing, and robust data persistence.

```mermaid
graph TD
    subgraph Client [Frontend React SPA]
        A[User Interface / React] --> B[Cart Context / React State]
        A --> C[Auth Context / Session State]
    end

    subgraph Server [Backend Node.js & Express API]
        D[Router Layer] --> E[VerifyToken / Auth Middleware]
        E --> F[Controller Layer]
        F --> G[Service Layer]
    end

    subgraph Persistence [Data & Asset Storage]
        G --> H[(MongoDB Atlas)]
        G --> I[Cloudinary API]
    end

    Client -- HTTPS Requests + JWT Bearer --> D
    E -- 1. JWT Decode & Validation <br/> 2. DB User Presence Check --> H
```

---

## 🚀 Key Features

### 👤 Customer Experience
*   **Animated Marketplace Landing:** A modern, animated landing page that details the initiative.
*   **Secure Authentication:** State-persistent JWT authentication with protected client-side routes.
*   **Smart Product Catalog:** Real-time search, category filtering (Crops vs. Poultry), and multi-criteria sorting.
*   **Database-Backed Shopping Cart:** Contents are synced dynamically to the database, ensuring zero cart-loss across multiple sessions.
*   **Real-time Stock Protection:** Strict checkout inventory checks to prevent stock over-purchasing.
*   **Order Tracking:** Ability to view past orders and cancel pending ones.

### 🛡️ Admin & Department of Agriculture Operations
*   **Interactive Analytics Dashboard:** Real-time summary statistics, recent transactions stream, and a dynamic 7-day revenue trend chart.
*   **Cascading User Management:** Ability to manage citizen accounts with full cascading deletion (cleaning up active carts and orders automatically).
*   **Inventory & Catalog Control:** Complete CRUD actions for listing crops and poultry, including seamless remote image uploads handled via Cloudinary.
*   **Intelligent Order Fulfillment:** Confirm pending orders to capture transaction revenue and auto-decrease inventory stock.
*   **Sales Performance Reporting:** Weekly, monthly, and annual sales breakdowns with aggregate indicators and CSV export tools.

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Cloudinary configurations
│   │   ├── controllers/     # API route handlers & request parsing
│   │   ├── middlewares/     # Auth, error handling, & session filters
│   │   ├── models/          # Mongoose schemas & Mongo structures
│   │   ├── routes/          # Express route mappings
│   │   ├── services/        # Core business & database logic
│   │   └── utils/           # Helper functions & CLI tools
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Premium, reusable UI modules
│   │   ├── context/         # Auth and Cart states (React Context)
│   │   ├── hooks/           # State management hooks
│   │   ├── pages/           # Landing, Consumer Shop, & Admin views
│   │   └── services/        # HTTP API communications
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for containerized setup)
*   A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string
*   A [Cloudinary](https://cloudinary.com/) account for image uploads

---

### Configuration

Set up environment variables in both layers before launching the platform:

#### 1. Backend Configuration (`backend/.env`)
Copy the template and fill in your secure credentials:
```bash
cp backend/.env.example backend/.env
```
Ensure the following variables are configured:
*   `MONGODB_URI`
*   `JWT_SECRET`
*   `CLOUDINARY_CLOUD_NAME`
*   `CLOUDINARY_API_KEY`
*   `CLOUDINARY_API_SECRET`

#### 2. Frontend Configuration (`frontend/.env`)
Copy the template:
```bash
cp frontend/.env.example frontend/.env
```

---

### Run Instructions

#### Option A: Running with Docker (Recommended)
Docker automatically coordinates services, volumes, and ports. From the root directory:
```bash
docker compose up --build
```
*   **Frontend Access:** [http://localhost:5173](http://localhost:5173)
*   **Backend Server:** [http://localhost:5000](http://localhost:5000)

#### Option B: Running Natively
Open two separate terminal windows:

##### Terminal 1: Backend Service
```bash
cd backend
npm install
npm run dev
```

##### Terminal 2: Frontend Client
```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Interface Preview

### 📍 Landing Page
Introduces the Dept. of Agriculture marketplace initiative with premium, animated components.
<img alt="Landing Page" src="https://github.com/user-attachments/assets/9b0364dc-4932-46e2-af3a-7e55948fc91a" />

---

### 🔑 Authentication (Sign Up & Log In)
Dual-role routing and state protection ensure seamless sessions.
| Sign Up | Log In |
|:---:|:---:|
| <img alt="Sign Up" src="https://github.com/user-attachments/assets/e9b7269e-08fd-4424-8fe1-5457590b8034" /> | <img width="498" height="750" alt="Log In" src="https://github.com/user-attachments/assets/950e9c38-6bda-4128-a1c2-0ac79ebe17b6" /> |

---

### 🛒 Consumer Marketplace
Highly interactive product catalog with search, filter, and state-persistent drawers.
| Shop & Products | Shopping Cart Drawer |
|:---:|:---:|
| <img alt="Shop and Products" src="https://github.com/user-attachments/assets/8cb9a248-3a4a-46bc-9a6b-3a9757f9a579" /> | <img alt="Shopping Cart" src="https://github.com/user-attachments/assets/6a4ee4f5-dabc-4586-b39d-324338014fc9" /> |

---

### 📦 Customer Profile & Orders
Comprehensive user dashboard for managing credentials and monitoring order statuses.
| Profile Settings | Order History |
|:---:|:---:|
| <img alt="Account Settings" src="https://github.com/user-attachments/assets/148b6c2a-77c8-4b69-8a2d-f37a34f5724d" /> | <img alt="Order History" src="https://github.com/user-attachments/assets/0d1f28fe-02a7-4dc1-8a19-30472a630bd2" /> |

---

### 📊 Admin Operations Center
Complete visual indicators and controls designed for Department of Agriculture staff.
*   **Overview Dashboard:**
    <img alt="Dashboard" src="https://github.com/user-attachments/assets/95233f0b-4787-4066-8147-eff831114eb8" />
*   **User Management:**
    <img alt="Users Management" src="https://github.com/user-attachments/assets/01fa2457-2ab0-4dd8-ad7d-f57b309c2a2d" />
*   **Inventory Panel:**
    <img alt="Inventory" src="https://github.com/user-attachments/assets/c507baae-15ed-4441-aed7-a530385c803c" />
*   **Order Fulfillment:**
    <img alt="Order Fulfillment" src="https://github.com/user-attachments/assets/80c867b8-9371-4dd6-8ce0-d3187799efdd" />
*   **Sales Reports:**
    <img alt="Sales Reports" src="https://github.com/user-attachments/assets/4d5378c9-6fc2-44e2-8d3d-39a68030898f" />
