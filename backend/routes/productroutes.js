// routes/productroutes.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 🟢 Get all products (for buyers)
router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name email");

    // Convert image buffer to Base64 for frontend display
    const formattedProducts = products.map((p) => ({
      _id: p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      seller: p.sellerId?.name || "Unknown Seller",
      image: p.image?.data
        ? `data:${p.image.contentType};base64,${p.image.data.toString("base64")}`
        : null,
      createdAt: p.createdAt,
    }));

    res.json(formattedProducts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

export default router;
