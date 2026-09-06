import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Canteen from "./models/Canteen.js";
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
app.set('trust proxy', 1);
const port = process.env.PORT || 5001;
const clientOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        // Allow server-to-server or Postman requests (missing origin)
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

app.get("/api/seed", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: 'himanshu2005gupta@gmail.com' });
    if (existingAdmin) {
      return res.json({ message: 'Database already seeded.', admin: existingAdmin.email });
    }

    const hashedPassword = await bcrypt.hash('Hg28@2005', 10);
    const admin = await User.create({
      name: 'Himanshu Gupta',
      email: 'himanshu2005gupta@gmail.com',
      phone: '+917982100712',
      password: hashedPassword,
      role: 'admin',
      lastLoginAt: new Date(),
    });

    await User.create({
      name: 'Priya Patel',
      email: 'student@bitez.com',
      phone: '+919876543211',
      role: 'student',
    });

    await Canteen.create({
      ownerId: admin._id,
      name: 'Campus Food Court',
      location: 'Ground Floor, Main Building',
      timings: '8:00 AM - 8:00 PM',
      contactPhone: '+917982100712',
      contactEmail: 'himanshu2005gupta@gmail.com',
      menuItems: [
        { name: 'Veg Burger', price: 60, category: 'Burgers', available: true },
        { name: 'Chicken Burger', price: 80, category: 'Burgers', available: true },
        { name: 'Paneer Tikka Pizza', price: 120, category: 'Pizza', available: true },
        { name: 'Margherita Pizza', price: 100, category: 'Pizza', available: true },
        { name: 'Cold Coffee', price: 50, category: 'Beverages', available: true },
        { name: 'Masala Chai', price: 20, category: 'Beverages', available: true },
        { name: 'Fresh Lime Soda', price: 30, category: 'Beverages', available: true },
        { name: 'Samosa (2 pcs)', price: 25, category: 'Snacks', available: true },
        { name: 'French Fries', price: 45, category: 'Snacks', available: true },
        { name: 'Veg Fried Rice', price: 70, category: 'Main Course', available: true },
        { name: 'Paneer Butter Masala', price: 90, category: 'Main Course', available: true },
        { name: 'Dal Fry', price: 55, category: 'Main Course', available: true },
        { name: 'Jeera Rice', price: 50, category: 'Main Course', available: true },
        { name: 'Gulab Jamun (2 pcs)', price: 35, category: 'Desserts', available: true },
        { name: 'Chocolate Brownie', price: 55, category: 'Desserts', available: true },
      ],
    });

    res.json({ message: 'Database seeded successfully!', admin: admin.email });
  } catch (error) {
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
});

app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
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
