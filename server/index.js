// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // options are optional in latest Mongoose
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit process if DB fails
  }
};
connectDB();

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "API running..." });
});

app.get("/api/users", (req, res) => {
  res.status(200).json([{ id: 1, name: "Akshit" }]);
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Server error" });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
