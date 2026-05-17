# Farm-to-Table E-Commerce Platform

This project is a web application for the Department of Agriculture (DA) designed to act as a central merchant, offering an online public market catalog for customers to buy agricultural products directly.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for containerized setup)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string
- A [Cloudinary](https://cloudinary.com/) account for image storage

---

## Configuration

Before running the application, you must set up your environment variables.

### 1. Backend Environment (`backend/.env`)
Copy the example file and fill in your credentials:
```bash
cp backend/.env.example backend/.env
```

### 2. Frontend Environment (`frontend/.env`)
Copy the example file:
```bash
cp frontend/.env.example frontend/.env
```

---

## How to Run

### Option A: Using Docker (Recommended)
Docker ensures that everyone runs the exact same environment.

1.  From the root directory, run:
    ```bash
    docker-compose up --build
    ```
2.  **Frontend**: Open [http://localhost:5173](http://localhost:5173)
3.  **Backend**: API runs on [http://localhost:5000](http://localhost:5000)

### Option B: Running Natively (Without Docker)
You will need two terminal windows open.

#### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```

#### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Project Structure
- `/frontend`: React + Vite application (TypeScript)
- `/backend`: Node + Express server (TypeScript)
- `docker-compose.yml`: Orchestration for local development

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query
- **Backend**: Node.js, Express, TypeScript, Mongoose, JWT
- **DevOps**: Docker, Docker Compose
