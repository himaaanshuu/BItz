# Bitez

Bitez is a campus food ordering experience with a Vite + React frontend and an Express + MongoDB backend.

## Project Structure

- `bitz-frontend/` – React UI (Vite)
- `bitz-backend/` – Express API with MongoDB + JWT auth

## Backend setup (MongoDB + JWT)

1. Copy environment variables:

   - Create `bitz-backend/.env` from `bitz-backend/.env.example`.
   - Fill in `MONGODB_URI` and `JWT_SECRET`.

2. Install dependencies:

   ```zsh
   cd /Users/himanshu/Bitez/bitz-backend
   npm install
   ```

3. Seed the admin (required for admin login):

   ```zsh
   npm run seed:admin
   ```

4. Run the API:

   ```zsh
   npm run dev
   ```

API endpoints:
- `POST /api/auth/student/register`
- `POST /api/auth/student/request-otp`
- `POST /api/auth/student/login`
- `POST /api/auth/admin/request-otp`
- `POST /api/auth/admin/login`
- `GET /api/auth/me`
- `GET /api/health`

## Frontend setup

```zsh
cd /Users/himanshu/Bitez/bitz-frontend
npm install
npm run dev
```

## Root scripts

From the repo root you can run:

```zsh
npm run dev
npm run build
npm run preview
```

These forward to `bitz-frontend`.

## Production notes

- Set `NODE_ENV=production` and `CLIENT_ORIGIN` for the deployed frontend URL.
- Never commit real `.env` files; only commit `.env.example`.

## OTP providers

- SMS OTP uses Twilio.

## MongoDB Atlas setup (what you need to provide)

1. **Connection string** (`MONGODB_URI`).
2. **Database user** with read/write access.
3. **IP allowlist** includes your server IP (or `0.0.0.0/0` for dev).
4. **Database name** (e.g., `bitez`).
