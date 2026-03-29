import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import vehicleRoutes from "./routes/vehicles.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/vehicles", authMiddleware, vehicleRoutes);

app.get("/", (req, res) => {
  res.json({ message: "MotorWae API running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
