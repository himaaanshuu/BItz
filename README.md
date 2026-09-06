# Bitez

A modern campus food ordering platform that lets students skip the queue and order ahead. Built with Vite + React frontend and Express + MongoDB backend.

---

## Live Links

| Service | URL |
|---------|-----|
| Frontend | [https://bitez-theta.vercel.app](https://bitez-theta.vercel.app) |
| Backend API | [https://bitz-backend.onrender.com](https://bitz-backend.onrender.com) |

---

## Overview

Bitez connects campus canteens with students through a seamless digital ordering experience. Students can browse menus, place orders, track preparation in real-time, and pick up their food when it is ready. Canteen admins get a dashboard to manage menus, track orders, and monitor analytics.

---

## Features

- **Student Auth** - Phone OTP login + Google OAuth
- **Admin Auth** - Email + password + mandatory OTP (two-factor)
- **Admin Dashboard** - Real-time order management, menu CRUD, analytics
- **Live Order Tracking** - Students see preparation status in real-time
- **Menu Management** - Canteen admins add, edit, toggle availability with image URLs
- **Session Expiry** - 3-day sessions with 3-hour warning popup
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Scroll Animations** - Framer Motion powered page transitions and reveals
- **Phone Input** - Country code dropdown with 30+ countries
- **SMS OTP** - Twilio Messaging Service for production SMS delivery
- **Favicon** - Bitez logo as browser favicon with SEO meta tags
- **Security** - JWT algorithm enforcement, server-side price validation, timing-safe OTP comparison, request size limits

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Lucide React |
| Backend | Node.js, Express, Mongoose, bcryptjs |
| Database | MongoDB Atlas |
| Auth | JWT (3-day expiry), Phone OTP, Google OAuth |
| SMS | Twilio Messaging Service |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
Bitez/
  bitz-frontend/              # Vite + React SPA
    src/
      components/             # Navbar, Footer, PhoneInput, ScrollReveal, SessionExpiryAlert
      pages/                  # Home, About, Auth, Dashboard, Profile, Orders
      services/               # API client (api.js)
    public/                   # Static assets (logo, favicon)
    vercel.json               # SPA rewrite rules

  bitz-backend/               # Express + MongoDB API
    src/
      models/                 # User, Canteen, Order, Otp
      routes/                 # auth, canteens, orders, payments
      seed/                   # Database seeding scripts
      middleware/              # Auth, role, rate limiting
      utils/                  # OTP generation, SMS notification, validation
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone and Install

```bash
git clone https://github.com/himaaanshuu/BItz.git
cd BItz

# Install backend
cd bitz-backend && npm install

# Install frontend
cd ../bitz-frontend && npm install
```

### 2. Configure Environment

Create `bitz-backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bitz?retryWrites=true&w=1
JWT_SECRET=your_secret_key_at_least_32_chars
CLIENT_ORIGIN=http://localhost:3000,http://localhost:5173
NODE_ENV=development

# Twilio (for SMS OTP)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_MESSAGING_SERVICE_SID=MGxxxxxxxxxxxxxxx
```

Create `bitz-frontend/.env`:

```env
VITE_API_URL=http://localhost:5001/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Seed Database

```bash
cd bitz-backend
npm run seed:all
```

### 4. Start Development

```bash
# Terminal 1 - Backend
cd bitz-backend && npm run dev

# Terminal 2 - Frontend
cd bitz-frontend && npm run dev
```

Frontend: `http://localhost:3000` | Backend: `http://localhost:5001`

---

## Production Credentials

### Admin Login

| Field | Value |
|-------|-------|
| Email | `himanshu2005gupta@gmail.com` |
| Phone | `+917982100712` |
| Password | `Hg28@2005` |

Admin login requires **email + password + OTP** (mandatory two-factor auth).

### Student Login

Students log in with **phone number + OTP** (sent via SMS).

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/student/register` | Register student |
| POST | `/api/auth/student/request-otp` | Request student OTP (phone) |
| POST | `/api/auth/student/login` | Student login (phone + OTP) |
| POST | `/api/auth/student/google` | Google OAuth login |
| POST | `/api/auth/admin/request-otp` | Request admin OTP (email + phone) |
| POST | `/api/auth/admin/login` | Admin login (email + password + OTP) |
| POST | `/api/auth/change-password` | Change admin password |
| GET | `/api/auth/me` | Get current user profile |
| GET | `/api/seed` | Seed database (one-time) |

### Canteens

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/canteens/public` | Public | List all canteens |
| GET | `/api/canteens/me` | Admin | Get admin's canteen |
| POST | `/api/canteens/me` | Admin | Create canteen |
| PUT | `/api/canteens/me` | Admin | Update canteen |
| POST | `/api/canteens/me/menu` | Admin | Add menu item (with image URL) |
| PUT | `/api/canteens/me/menu/:id` | Admin | Update menu item |
| DELETE | `/api/canteens/me/menu/:id` | Admin | Delete menu item |

### Orders

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | Student | Create order |
| GET | `/api/orders/me` | Student | Get my orders |
| GET | `/api/orders/admin/all` | Admin | Get all orders |
| PUT | `/api/orders/:id/status` | Admin | Update order status |

---

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import on Vercel with root directory `bitz-frontend`
3. Set env vars:
   - `VITE_API_URL` = `https://bitz-backend.onrender.com/api`
   - `VITE_GOOGLE_CLIENT_ID` = your Google OAuth client ID
4. Deploy

### Backend (Render)

1. Push to GitHub
2. Create Web Service on Render with root directory `bitz-backend`
3. Build: `npm install`
4. Start: `node src/index.js`
5. Set env vars:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your MongoDB Atlas URI (use `w=1` not `w=majority`)
   - `JWT_SECRET` = secure random string (32+ chars)
   - `CLIENT_ORIGIN` = `https://bitez-theta.vercel.app`
   - `TWILIO_ACCOUNT_SID` = your Twilio Account SID
   - `TWILIO_AUTH_TOKEN` = your Twilio Auth Token
   - `TWILIO_MESSAGING_SERVICE_SID` = your Twilio Messaging Service SID
6. Seed database: visit `https://your-backend.onrender.com/api/seed`

---

## License

MIT

---

## Author

[@himaaanshuu](https://github.com/himaaanshuu)
