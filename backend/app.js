import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { apiRateLimit, authRateLimit } from "./middleware/rateLimitMiddleware.js";

export function createApp() {
  const app = express();
  const allowedOrigins = (process.env.CLIENT_ORIGIN ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin denied"));
    },
  }));
  app.use(express.json());
  app.use(apiRateLimit);

  app.use("/api/auth", authRateLimit, authRoutes);
  app.use("/api/dashboard", dashboardRoutes);

  app.get("/", (req, res) => {
    res.send("API Running...");
  });

  app.use((error, req, res, next) => {
    if (error.message === "CORS origin denied") {
      return res.status(403).json({ message: "Origin not allowed" });
    }

    return next(error);
  });

  return app;
}
