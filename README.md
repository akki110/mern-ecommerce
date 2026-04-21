# 🛒 MERN E-commerce Application

A full-stack E-commerce web application built using the **MERN stack (MongoDB, Express, React, Node.js)**.
This project includes authentication, product management, search & sorting, and payment integration.

---

## 🚀 Tech Stack

### 🔹 Frontend

- React.js
- Axios
- React Router DOM
- Tailwind CSS / Bootstrap (as used)

### 🔹 Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

### 🔹 Authentication

- JWT (JSON Web Token)
- bcrypt (Password Hashing)

### 🔹 Payment

- Razorpay Integration

---

## ✨ Features

### 🏠 Home Page

- Display featured products
- Clean UI

### 📦 Product Listing

- View all products
- Display product image, name, price, category

### 🔍 Search & Filter

- Search by name or category
- Dynamic filtering

### ↕️ Sorting

- Price (Low → High)
- Price (High → Low)
- New Products
- Sale Products

### 📄 Product Details

- Full product information
- Add to cart functionality

### 🔐 Authentication

- User Signup
- User Login
- JWT-based authentication

### 💳 Payment

- Razorpay payment integration
- Order creation & verification

---

## 📁 Project Structure

```
mern-ecommerce/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── validations/
│   │   ├── utils/
│   │   └── app.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
```

### Run Backend:

```bash
npm run dev
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints (Sample)

### 🔐 Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### 📦 Products

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products?search=keyword`
- `GET /api/products?sort=price_asc`

### 💳 Payment

- `POST /api/payment/create-order`

---

## 🚀 Future Improvements

- Cart persistence
- Order history
- Admin dashboard
- Product reviews

---

## 📌 Notes

- Axios interceptor used for attaching JWT token
- Express static used for serving uploaded files
- MVC architecture followed in backend

---

## 👨‍💻 Author

**Akshar Patel**

---

## ⭐ Acknowledgement

This project was developed as part of a technical assessment to demonstrate full-stack development skills using the MERN stack.

---
