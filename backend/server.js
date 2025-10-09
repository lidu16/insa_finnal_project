// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Import routes
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// --- CORS Setup ---
// Allow frontend at localhost:5173 (Vite default) to access backend
app.use(cors({
  origin: "http://localhost:5173", // change if your frontend runs on another port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend running"));

// Test if MONGO_URI is read correctly
console.log("Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MongoDB URI is missing! Check your .env file.");
  process.exit(1); // Stop server                                                                              
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
