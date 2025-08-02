# 🚀 Hackathon Project – Odoo x CGC Hackathon 2025

A full-stack web application built during the Odoo x CGC Hackathon 2025. This project showcases real-time data handling, robust backend architecture, and a clean, responsive UI—all designed to solve a real-world problem effectively.

---

## 📌 Problem Statement

🔒 *To be updated once the official problem statement is released at 8:00 AM on August 2, 2025.*

---

## 🧠 Key Features

- ⚡ Real-time or dynamic data handling (no static JSON)
- 🧪 Robust input validation across forms and user interactions
- 📶 Offline/local functionality for uninterrupted access
- 🧬 Clean and responsive UI with consistent layout and color scheme
- 🔐 Secure backend APIs with proper data modeling
- 🔄 Git-based version control with collaborative workflow

---

## 🛠️ Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Frontend    | HTML, CSS, JavaScript / React |
| Backend     | Node.js, Express.js |
| Database    | MongoDB (local setup) |
| Version Control | Git + GitHub |
| Deployment  | Localhost (offline-first) |

# 🚀 QuickDesk Backend

Welcome to the backend of QuickDesk — a ticket management system built with Node.js, Express, MongoDB, and JWT. This README will help you understand **what each folder and file does**, so you can jump in and contribute confidently.

---

## 🧱 Project Overview

This backend handles:

- ✅ User registration and login
- ✅ Email verification and password reset
- ✅ Ticket creation and email notifications
- ✅ JWT-based route protection
- ✅ Modular folder structure for clarity

---

## 📁 Folder Breakdown

### 🔹 `controllers/`
Handles the actual logic for each route.

- `authController.js`:  
  - Registers users  
  - Sends verification and reset emails  
  - Verifies email tokens  
  - Handles login

- `ticketController.js`:  
  - Creates tickets  
  - Sends confirmation emails

---

### 🔹 `routes/`
Defines the API endpoints.

- `auth.js`:  
  - `/register` → creates a user  
  - `/request-password-reset` → sends reset email  
  - `/verify-email/:token` → verifies user email

- `ticket.js`:  
  - `/create` → creates a ticket (JWT protected)

---

### 🔹 `models/`
Defines the database structure using Mongoose.

- `User.js`:  
  - Stores user info (name, email, password, role)  
  - Handles password hashing and comparison

- `Ticket.js`:  
  - Stores ticket info (subject, description, status, user)

- `Token.js`:  
  - Stores temporary tokens for email verification and password reset

---

### 🔹 `middleware/`
Contains reusable logic for route protection.

- `authMiddleware.js`:  
  - Checks for valid JWT token  
  - Attaches user info to `req.user`  
  - Blocks access if token is missing or invalid

---

### 🔹 `utils/`
Helper functions used across the app.

- `sendEmail.js`:  
  - Sends emails using Nodemailer  
  - Used for welcome, verification, reset, and ticket emails

- `generateToken.js`:  
  - Creates JWT tokens for login

- `errorHandler.js`:  
  - Formats error responses consistently

---

### 🔹 `templates/`
HTML templates for emails.

- `welcomeTemplate.js`: Welcome email after registration  
- `verifyEmailTemplate.js`: Email verification link  
- `resetPasswordTemplate.js`: Password reset link  
- `ticketTemplate.js`: Ticket confirmation email

---

### 🔹 `app.js`
Main entry point of the backend.

- Loads environment variables  
- Connects to MongoDB  
- Sets up middleware (CORS, JSON parsing, logging)  
- Registers routes  
- Starts the server

---

### 🔹 `.env` (Not pushed to GitHub)
Stores sensitive config like:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/quickdesk
JWT_SECRET=yourSuperSecretKey
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3000


---

🧪 How to Run Locally
- Clone the repo
- Run npm install
- Create a .env file (see above)
- Run npm run dev
- Test endpoints using Postman or Thunder Client



## 👥 Team Members

- Ritik – Backend Lead (API design, DB modeling)
- Hritika  – Frontend Developer
- Abhisekh – Integration & Testing
- Vaibhav – Demo & Presentation

