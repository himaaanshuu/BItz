import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import canteenRoutes from "./routes/canteens.js";
import paymentRoutes from "./routes/payments.js";

dotenv.config({ override: true });

const app = express();
const port = process.env.PORT || 5000;
const clientOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
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
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/canteens", canteenRoutes);
app.use("/api/payments", paymentRoutes);

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
