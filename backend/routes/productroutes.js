import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 🟢 Get all approved products
router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find({ approvalStatus: "Approved" });

    const formatted = products.map((p) => ({
      _id: p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image?.data
        ? `data:${p.image.contentType};base64,${p.image.data.toString("base64")}`
        : null,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

export default router;
