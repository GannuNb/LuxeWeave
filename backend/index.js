import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import sellerAuthRoutes from "./routes/sellerAuthRoutes.js";
import sellerProductRoutes from "./routes/sellerProductRoutes.js";
import sellerOrderRoutes from "./routes/sellerOrderRoutes.js";
import productRoutes from "./routes/productroutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // ✅ added this line
import userProductRoutes from "./routes/userProductRoutes.js";

dotenv.config();
const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 🧩 Routes
app.use("/api/auth", authRoutes);
app.use("/api/sellerauth", sellerAuthRoutes);
app.use("/api/sellerrouting", sellerProductRoutes);
app.use("/api/seller", sellerOrderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes); // ✅ added this line
app.use("/api/user-products", userProductRoutes);


// 🧩 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// 🧩 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
