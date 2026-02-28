import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import canteenRoutes from "./routes/canteens.js";
import paymentRoutes, { stripeWebhook } from "./routes/payments.js";
import orderRoutes from "./routes/orders.js";
import authLimiter from "./middleware/rateLimitAuth.js";

dotenv.config({ override: true });

if (!process.env.JWT_SECRET && process.env.NODE_ENV !== 'production') {
  process.env.JWT_SECRET = 'dev-only-secret-change-in-production-min-32-chars';
  console.warn('Using default JWT_SECRET for development. Set JWT_SECRET in .env for production.');
}

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missing = requiredEnvVars.filter((key) => !process.env[key] || process.env[key].trim() === '');
if (missing.length > 0) {
  console.error('Missing required env:', missing.join(', '));
  process.exit(1);
}
if (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be at least 32 characters in production.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5001;
const clientOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV === 'production' && !origin) {
        return callback(new Error('CORS not allowed: missing origin'));
      }
      if (!origin || clientOrigins.length === 0) {
        return callback(null, true);
      }

      if (clientOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (process.env.NODE_ENV !== "production") {
        if (
          origin.startsWith("http://localhost:") ||
          origin.startsWith("http://127.0.0.1:")
        ) {
          return callback(null, true);
        }
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
app.use(express.json());

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/canteens", canteenRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
