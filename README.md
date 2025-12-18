# 🛒 Forever E-Commerce Platform

A full-stack e-commerce solution built with React for the customer-facing store and a dedicated administrative panel, backed by a robust Node.js/Express API.

## 🚀 Features

### Customer Store (`frontend` folder)
* **Product Catalog:** Browse and view all available products.
* **Product Detail Page:** Detailed information, images, and options for each product.
* **Shopping Cart:** Add, remove, and manage items in the cart.
* **User Authentication:** Secure user Login and Signup.
* **Checkout:** Place orders via a dedicated checkout page.
* **Order History:** View past orders.

### Admin Panel (`admin` folder)
* **Product Management:** Add new products with details and images.
* **Product Listing:** View and manage the current product inventory.
* **Order Management:** Track and update the status of all customer orders.

## 🛠️ Tech Stack

### Client (Frontend & Admin)
* **Framework:** React (using JSX)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS

### Server (Backend)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose Schemas)
* **Image Storage:** Cloudinary (for product images)
* **Authentication:** JWT (JSON Web Tokens)
* **Payment:** Integration for Razorpay/Stripe (based on assets)

## 📦 Installation and Setup

This project uses a monolithic repository structure, with separate directories for the backend, customer frontend, and admin frontend.

### Prerequisites
* Node.js (LTS version)
* A running MongoDB instance or connection string
* API keys for Cloudinary and your chosen payment gateway (e.g., Stripe/Razorpay).

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install all required Node.js dependencies:
    ```bash
    npm install
    ```
3.  **Configuration:** Create a `.env` file in the `backend` directory and add your database and service credentials.

### 2. Frontend and Admin Setup

You will need two separate terminal windows for these steps.

1.  **Customer Frontend:**
    ```bash
    cd frontend
    npm install
    ```
2.  **Admin Panel:**
    ```bash
    cd ../admin
    npm install
    ```

## ▶️ Running the Application

In three separate terminal windows, run the start command for each part of the application:

1.  **Start the Backend Server (API):**
    ```bash
    cd backend
    node server.js
    ```
    *The API should be running on the configured port (https://forever-backend-snowy.vercel.app/)*

2.  **Start the Customer Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    *The store will typically open at (https://forever-frontend-theta-coral.vercel.app/)*

3.  **Start the Admin Panel:**
    ```bash
    cd admin
    npm run dev
    ```
    *The admin panel will typically open at (https://forever-admin-pearl-sigma.vercel.app/list)*
