
# Bitez

A modern campus food ordering platform that lets students skip the queue and order ahead. Built with Vite + React frontend and Express + MongoDB backend.

---

## Overview

Bitez connects campus canteens with students through a seamless digital ordering experience. Students can browse menus, place orders, track preparation in real-time, and pick up their food when it is ready. Canteen admins get a dashboard to manage menus, track orders, and monitor analytics.

---

## Features

- **Student Authentication** - Phone OTP and Google OAuth login
- **Admin Dashboard** - Real-time order management, menu CRUD, analytics
- **Live Order Tracking** - Students see preparation status in real-time
- **Menu Management** - Canteen admins add, edit, toggle availability of items
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Scroll Animations** - Framer Motion powered page transitions and reveals
- **Docker Support** - Full containerization for local development

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB (local or Atlas) |
| Auth | JWT, OTP, Google OAuth |
| Deployment | Vercel (frontend), Railway/Render (backend) |

---

## Project Structure

```
Bitez/
  bitz-frontend/          # Vite + React SPA
    src/
      components/         # Navbar, Footer, ScrollReveal, AnimatedBanner
      pages/              # Home, About, Auth, Dashboard, Profile, etc.
      services/           # API client
    public/               # Static assets (logo, hero image)
    vercel.json           # Vercel SPA rewrite rules

  bitz-backend/           # Express + MongoDB API
    src/
      models/             # User, Canteen, Order, Otp
      routes/             # auth, canteens, orders, payments
      seed/               # Demo data seeding scripts
      middleware/          # Auth, role, rate limiting
    Dockerfile
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- MongoDB (local or Atlas)

### 1. Clone and Install

```bash
git clone https://github.com/himaaanshuu/Bitez.git
cd Bitez

# Install backend dependencies
cd bitz-backend && npm install

# Install frontend dependencies
cd ../bitz-frontend && npm install
```

### 2. Configure Environment

Create `bitz-backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/bitz
JWT_SECRET=your_secret_key_at_least_32_chars
CLIENT_ORIGIN=http://localhost:3000
```

### 3. Seed Demo Data

```bash
cd bitz-backend
npm run seed:all
```

This creates:
- Admin: `admin@bitez.com` / `Admin@123!`
- Student: `student@bitez.com` / `Student@123!`
- Canteen with 15 menu items

### 4. Start Development

```bash
# From root
npm run dev
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5001`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/student/register` | Register student |
| POST | `/api/auth/student/request-otp` | Request OTP (phone) |
| POST | `/api/auth/student/login` | Login with OTP |
| POST | `/api/auth/student/google` | Google OAuth login |
| POST | `/api/auth/admin/request-otp` | Request admin OTP |
| POST | `/api/auth/admin/login` | Admin login (email + password + OTP) |
| POST | `/api/auth/change-password` | Change admin password |
| GET | `/api/auth/me` | Get current user |

### Canteens

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/canteens/public` | Public | List all canteens |
| GET | `/api/canteens/me` | Admin | Get admin's canteen |
| POST | `/api/canteens/me` | Admin | Create canteen |
| PUT | `/api/canteens/me` | Admin | Update canteen |
| POST | `/api/canteens/me/menu` | Admin | Add menu item |
| PUT | `/api/canteens/me/menu/:id` | Admin | Update menu item |
| DELETE | `/api/canteens/me/menu/:id` | Admin | Delete menu item |

### Orders

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | Student | Create order |
| GET | `/api/orders/me` | Student | Get my orders |

---

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import repository on Vercel
3. Set root directory to `bitz-frontend`
4. Set environment variables:
   - `VITE_API_URL` - Your production backend URL
   - `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
5. Deploy

### Backend (Railway / Render)

1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Set root directory to `bitz-backend`
4. Set environment variables:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Secure random string (32+ chars)
   - `CLIENT_ORIGIN` - Your Vercel frontend URL
   - `NODE_ENV` - production
5. Deploy

---

## What's Next (v2 Roadmap)

Planned features and improvements for the next version:

| Feature | Priority | Status |
|---------|----------|--------|
| Real-time order updates via WebSocket | High | Planned |
| Push notifications for order status | High | Planned |
| Payment integration (UPI + Stripe) | High | Planned |
| Cart persistence across sessions | Medium | In Progress |
| Order history with reorder functionality | Medium | Planned |
| Canteen analytics dashboard (charts) | Medium | Planned |
| Multi-canteen support per admin | Low | Planned |
| Student wallet and loyalty points | Low | Planned |
| SMS/WhatsApp order notifications | Low | Planned |
| Admin mobile app (React Native) | Low | Planned |

---

## Known Issues

| Issue | Severity | Workaround |
|-------|----------|------------|
| OTP rate limiting not enforced | Medium | Avoid excessive requests in dev |
| CORS issues in local dev | Low | Use Vite proxy or set CORS headers |
| No input validation on some endpoints | Medium | Validate on client side |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and test
4. Commit with a descriptive message
5. Push and open a Pull Request

---

## License

MIT

---

## Author

[@himaaanshuu](https://github.com/himaaanshuu)
