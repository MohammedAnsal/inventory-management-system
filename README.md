# 📦 Inventory Management System (MERN Stack)

A full-stack Inventory Management application built using React, Node.js, Express, and MongoDB with secure authentication, email verification, Google OAuth, and protected product management.

This project demonstrates clean architecture, secure authentication flow, and backend-driven search & pagination.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT (Access & Refresh Tokens)
- Email Verification (JWT-based)
- Google OAuth
- Zod Validation
- Cookie-based Authentication

### Frontend
- React (Vite)
- TypeScript
- Zustand (State Management)
- React Router v6
- React Hook Form + Zod
- Tailwind CSS
- Framer Motion
- React Query
- Axios

---

## ✨ Features

### 🔐 Authentication
- User Registration
- Secure Password Hashing (bcrypt)
- Email Verification (expires in 24h)
- Google OAuth Login
- JWT Access & Refresh Token system
- Protected Routes
- Logout functionality

### 📦 Product Management
- Add Product
- List Products
- Update Product
- Delete Product
- Backend-driven Search
- Backend Pagination
- Debounced Search UI
- Secure API Access

---

# 🛠️ Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/inventory-management-system.git
cd inventory-management-system
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:
```
http://localhost:5000
```

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5005
```

---

# 🔐 Environment Variables

## Backend (.env inside server folder)

Create a `.env` file inside the `server` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
VERIFY_EMAIL_SECRET=your_email_secret

FRONTEND_URL=http://localhost:5005

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

GOOGLE_CLIENT_ID=your_google_client_id
```

## Frontend (.env inside client folder)

Create a `.env` file inside the `client` directory:

```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

# 🔎 API Endpoints

### Authentication

```
POST   /api/auth/signUp
POST   /api/auth/signIn
GET    /api/auth/verify-email
POST   /api/auth/google-signIn
POST   /api/auth/resend-verification
POST   /api/auth/logout
GET    /api/auth/me
```

### Products

```
GET    /api/products?page=1&limit=10&search=keyword
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

# 🔒 Security Highlights

- Password hashing using bcrypt
- JWT-based authentication
- Email verification with expiration
- HTTP-only cookie support
- Protected backend routes
- Secure CORS configuration
- Token-based route guarding

---

# 📝 Notes

- MongoDB Atlas is required.
- Gmail App Password is required for email sending.
- Google OAuth must have correct Authorized JavaScript Origin configured.
- `.env` files are not committed to GitHub.
- Project created as part of a technical assessment.

---

# ✅ Submission Checklist

- Public GitHub repository
- README with setup instructions
- `.env.example` file included
- Authentication working
- Product CRUD working
- Search & Pagination implemented
- Project builds successfully

---

# 👨‍💻 Author

Developed as part of a MERN Developer Machine Task.
