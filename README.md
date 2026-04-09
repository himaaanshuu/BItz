
# 🍽️ Bitez

Bitez is a modern campus food ordering experience with a Vite + React frontend (Port 3000) and an Express + MongoDB backend. It features a complete UI/UX overhaul with glassmorphism aesthetics, dynamic "drop in" animations, and integrated student/admin authentication (OTP + Google OAuth). The project is developer-friendly, split into frontend and backend packages with full Docker containerization support!

- Frontend: bitz-frontend (Vite + React @ localhost:3000)
- Backend: bitz-backend (Express + MongoDB + JWT / Dockerized)


## 📚 Table of contents

- [✨ Features](#-features)
- [🧰 Tech stack](#-tech-stack)
- [⚙️ Prerequisites](#-prerequisites)
- [🚀 Quick start (recommended)](#-quick-start-recommended)
- [🔒 Backend setup (MongoDB + JWT)](#-backend-setup-mongodb--jwt)
  - [🧩 Environment variables](#-environment-variables)
  - [👤 Seed admin (required)](#-seed-admin-required)
  - [▶️ Run the API](#-run-the-api)
  - [📡 API endpoints](#-api-endpoints)
- [💻 Frontend setup](#-frontend-setup)
- [📦 Root scripts](#-root-scripts)
- [🛠️ Development tips & troubleshooting](#-development-tips--troubleshooting)
- [🚧 Currently working on / Improvements](#-currently-working-on--improvements)
- [🐞 Current issues / Known bugs](#-current-issues--known-bugs)
- [🤝 Contributing](#-contributing)
- [📄 License & contact](#-license--contact)


## ✨ Features

- ✅ Student and admin authentication (Phone OTP + Google OAuth)
- 🎨 Modern Glassmorphism UI (Custom `#FAFAFA` & Slate theme with Orange/Rose accents)
- 🚀 Dynamic animations (Wait time burgers, Drop-In hero texts)
- 🐳 Fully Dockerized Backend environment
- 🧾 Admin seeding script for first-time setup
- 🔁 REST API endpoints for auth and health checks
- ⚡ Vite-powered React frontend for fast development (Port 3000)


## 🧰 Tech stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB
- Auth: JWT + OTP workflows
- Dev tools: npm


## ⚙️ Prerequisites

- Node.js (16+ recommended)
- npm
- MongoDB instance (local or cloud e.g., MongoDB Atlas)



## 🚀 Quick start (recommended)

From the repository root you can run both apps locally (see root scripts below):

```bash
# install dependencies for frontend and backend
npm install

# start both (see package.json scripts)
npm run dev
```


## 🔒 Backend setup (MongoDB + JWT)

1. Copy environment variables:

   - Create `bitz-backend/.env` from `bitz-backend/.env.example`
   - Fill in the required values (example below)

2. Install dependencies and run (from repo root or backend folder):

```bash
cd bitz-backend
npm install
```

3. Seed the admin (required for admin login):

```bash
npm run seed:admin
```

4. Run the API:

```bash
npm run dev
# or, to run from root if scripts forward:
npm run dev --workspace=bitz-backend
```

### 🧩 Environment variables

Example `bitz-backend/.env` (adjust to what's in your `.env.example`):

```env
PORT=5001
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/bitz?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_at_least_32_chars_in_production
CLIENT_ORIGIN=http://localhost:5173

# Optional: Twilio (OTP), UPI_VPA (UPI), STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET (card payments)
# See bitz-backend/.env.example for full list.
```

Keep secrets out of source control. Use a secrets manager or environment-specific configuration for production.

### 👤 Seed admin (required)

If your backend includes an admin seeder script, run:

```bash
npm run seed:admin
```

This will create the initial admin account (used to log in as admin). Check the seeder output for the seeded admin email/credentials or OTP flow.

### 📡 API endpoints

Common auth and health endpoints (adjust if your implementation differs):

- POST /api/auth/student/register
- POST /api/auth/student/request-otp
- POST /api/auth/student/login
- POST /api/auth/admin/request-otp
- POST /api/auth/admin/login
- GET  /api/auth/me
- GET  /api/health

Add further API docs or a Postman collection as the project grows.


## 💻 Frontend setup

From project root or the frontend folder:

```bash
cd bitz-frontend
npm install
npm run dev
```

The frontend is Vite-powered and will run on a local dev server mapped specifically to port 3000 (`http://localhost:3000`). Update frontend environment variables if needed (`VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`).


## 📦 Root scripts

The root package.json exposes convenience scripts that forward to the frontend/backend:

```bash
# start dev environment (frontend + backend as configured)
npm run dev

# build for production (usually frontend build)
npm run build

# preview built frontend
npm run preview
```

Check the root package.json to see exactly how scripts are forwarded and modify to suit your local workflow.


## 🛠️ Development tips & troubleshooting

- MongoDB connection issues:
  - 🔍 Verify `MONGODB_URI` and network access (IP allowlist for Atlas).
  - 📄 Check backend logs for connection errors.

- JWT issues:
  - 🔑 Ensure `JWT_SECRET` is set consistently across environments.
  - 🔁 If tokens appear invalid after code changes, restart servers.

- OTP flow:
  - ✉️ If OTPs are sent via email in production, use a dev/test provider or a mocked transport locally.

- Ports:
  - 🔢 If ports collide, update `PORT` in backend and dev server settings in frontend.

- Logging:
  - 📝 Increase log verbosity while debugging; revert before production.


## 🚧 Currently working on / Improvements

Working items (short, emoji-enhanced list) plus a piping-style status table for quick glance.

- 🧾 Improve ordering flow: cart persistence across sessions
- 🔁 Better order status UI & real-time updates (WebSocket or polling)
- 💳 Payment integration (Stripe or similar)
- 📚 API documentation (OpenAPI/Swagger or Postman)
- 🧪 Tests & CI (unit/integration tests + GitHub Actions)
- 🔒 Reliability & security (rate limiting, validation, error handling)
- 🐳 Docker support for local development
- ♿ Accessibility & UX improvements

Quick "piping" status table (Task | Status | Owner):

| Task | Status | Owner |
|---|---:|:---:|
| Cart persistence | In progress 🚧 | @himaaanshuu |
| Order real-time updates | Planning 📝 | — |
| Payment integration | Backlog ⏳ | — |
| API docs (Swagger) | In progress 🧾 | — |
| Tests & CI | Backlog 🧪 | — |

(You can edit this table as tasks move between statuses. The pipes `|` create an easy-to-read matrix.)

If you'd like, I can convert these into GitHub issues and add labels/milestones.


## 🐞 Current issues / Known bugs

Short descriptions and suggested workarounds. Use these to populate issue trackers.

- ⚠️ Admin seeder may fail if required env vars are missing
  - Workaround: Ensure `MONGODB_URI` and other env vars are set before running `npm run seed:admin`.
- 🛑 OTP rate limiting not enforced (potential spam risk)
  - Mitigation: Manually avoid excessive OTP requests; will add rate-limiting middleware soon.
- 🌐 CORS or proxy issues when frontend calls backend in dev
  - Workaround: Configure Vite proxy or set correct CORS headers in backend.
- 🧾 Missing validation on student registration endpoint (server may accept malformed input)
  - Mitigation: Validate input on client and server; add backend request validation.
- 💥 Server crashes on unhandled exceptions in some routes
  - Mitigation: Restart server; add centralized error handling and process-level guards.
- 🧩 Frontend build or environment mismatches
  - Mitigation: Ensure Node version matches the project's supported version; run `npm ci` and rebuild.

Piping-style issue summary (ID | Short | Severity):

| ID | Short | Severity |
|---:|---|:---:|
| #1 | Admin seeder env fail | High 🔴 |
| #2 | No OTP rate limit | Medium 🟠 |
| #3 | CORS dev issue | Low 🟡 |

Want these populated from live GitHub issues? I can fetch them and update this section automatically.


## 🤝 Contributing

Contributions welcome! Suggested workflow:

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Implement changes and add tests where applicable
4. Open a Pull Request with a descriptive title and summary

Please add a short description of any breaking changes and how to test them.


## 📄 License & contact

- License: add your license file (e.g., MIT) if not present.
- Contact / maintainer: @himaaanshuu


If you want, I can:
- ✅ Commit this README update and open a PR for you,
- 🔁 Pull the current open GitHub issues and populate the "Current issues" section with live data,
- 🧭 Create GitHub issues from the "Currently working on" table and assign priorities.

```
