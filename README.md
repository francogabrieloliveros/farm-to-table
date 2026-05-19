# Farm-to-Table E-Commerce Platform

This project is a web application for the Department of Agriculture (DA) designed to act as a platform, offering an online public market catalog for Filipinos to buy local agricultural products directly from farmers.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query
- **Backend**: Node.js, Express, TypeScript, Mongoose, JWT
- **DevOps**: Docker, Docker Compose

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for containerized setup)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string
- A [Cloudinary](https://cloudinary.com/) account for image storage

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

## Features

### Public Landing Page

A public-facing landing page that introduces the platform and the DA initiative. Visitors can navigate to login or register from here. The shop itself is accessible without login for browsing, but placing orders requires an account.

**Screenshot:**

<img alt="Landing Page" src="https://github.com/user-attachments/assets/dc26034d-441d-4c2b-b0d9-32d170cf60fc" />

---

### Authentication — Register & Login

Users can sign up using a valid email-format address. No OTP or email verification is required. Upon registration, accounts are automatically assigned the **Customer** role. The DA administrator account is pre-seeded via environment variables and does not go through the registration flow.

- JWT-based authentication with protected routes
- Public routes are hidden from already-logged-in users
- Admin-only routes are inaccessible to customer accounts

**Screenshots:**

| Sign Up                                                                                                          | Log In                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| <img alt="Sign Up Page" src="https://github.com/user-attachments/assets/942815f8-f200-4ba1-9a39-55ae930f4501" /> | <img alt="Log In Page" src="https://github.com/user-attachments/assets/ebff3786-7870-4353-8380-94d1f314d91f" /> |

---

### Customer — Shop & Products

The main shopping interface where customers browse all available agricultural products listed by the DA.

- **Search** products by name in real time
- **Filter** by product type: Crops or Poultry
- **Sort** by price (ascending/descending), name (A–Z), or quantity (low–high)
- Product cards show image, name, type, price, and available stock

**Screenshot:**

<img alt="Shop and Products" src="https://github.com/user-attachments/assets/8cb9a248-3a4a-46bc-9a6b-3a9757f9a579" />

---

### Customer — Shopping Cart & Checkout

A slide-out cart drawer accessible from the header on any shop page.

- Add, remove, or adjust quantities of items directly in the cart
- Live subtotal calculation
- **Data-persistent cart** — cart contents are saved to the database per user and restored across sessions _(+5 bonus points feature)_
- One-click **Place Order** button to convert the cart into pending orders

**Screenshot:**

<img alt="Shopping Cart" src="https://github.com/user-attachments/assets/6a4ee4f5-dabc-4586-b39d-324338014fc9" />

---

### Customer — Order History

Customers can view and manage their placed orders from the **Profile** page.

- Full order history with product name, quantity, date, and status
- Orders have three statuses: **Pending**, **Completed**, or **Cancelled**
- Customers may **cancel** a pending order before it is confirmed by the DA

**Screenshot:**

<img alt="Order History" src="https://github.com/user-attachments/assets/0d1f28fe-02a7-4dc1-8a19-30472a630bd2" />

---

### Customer — Profile & Account Settings

A dedicated profile page where customers can manage their account details. _(+5 bonus points feature)_

- Edit **first name**, **middle name**, and **last name**
- **Change password** with current password confirmation
- Email address is displayed but not editable (used as the account identifier)
- **Logout** button available directly from the profile page

**Screenshot:**

<img alt="Account Settings" src="https://github.com/user-attachments/assets/148b6c2a-77c8-4b69-8a2d-f37a34f5724d" />

---

### Admin — Dashboard Overview

The DA administrator's main landing page after login, providing a high-level summary of platform activity.

- **Stat cards** for: Total Registered Citizens, Pending Orders, Total Revenue, and Product Catalog size
- **Recent Transactions** table showing the latest orders with customer name, product, status badge, and total
- **Revenue Trend** bar chart showing daily activity for the current period

**Screenshot:**

<img alt="Dashboard" src="https://github.com/user-attachments/assets/95233f0b-4787-4066-8147-eff831114eb8" />

---

### Admin — User Management

A full list of all registered customer accounts on the platform.

- View all registered users and their details
- Total user count reported at a glance

**Screenshot:**

<img alt="Users Management" src="https://github.com/user-attachments/assets/1e60627e-af04-4707-94dc-19cce530a95c" />

---

### Admin — Inventory

The DA manages the entire product catalog from this page.

- **Add** new products with name, description, type (Crop / Poultry), price, quantity, and an uploaded image (via Cloudinary)
- **Edit** existing product details and inventory quantities
- **Delete** products from the catalog

**Screenshot:**

<img alt="Inventory" src="https://github.com/user-attachments/assets/c507baae-15ed-4441-aed7-a530385c803c" />

---

### Admin — Order Fulfillment

The DA reviews and acts on incoming customer orders.

- View all orders across all customers with product, quantity, customer info, date, and current status
- **Confirm** a pending order to mark it as Completed — this simultaneously decreases the product's inventory quantity
- **Cancel** a pending order to mark it as Cancelled - does not decrease the quantity of the product and does not go through with the order transaction
- Confirmed orders are considered final and ready for delivery

**Screenshot:**

<img alt="Order Fulfillment" src="https://github.com/user-attachments/assets/80c867b8-9371-4dd6-8ce0-d3187799efdd" />

---

### Admin — Sales Reports

A detailed breakdown of sales performance, switchable between time periods.

- Toggle between **Weekly**, **Monthly**, and **Annual** views
- Per-product breakdown showing units sold and income generated
- Aggregate total sales revenue for the selected period
- Pending order count displayed for context

**Screenshot:**

<img alt="Sales Reports" src="https://github.com/user-attachments/assets/4d5378c9-6fc2-44e2-8d3d-39a68030898f" />

---
