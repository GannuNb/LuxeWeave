import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * 🟢 Get all pending products
 */
router.get("/pending-products", async (req, res) => {
  try {
    const products = await Product.find({ approvalStatus: "Pending" });

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
    res.status(500).json({ message: "Error fetching pending products" });
  }
});

/**
 * ✅ Approve a product
 */
router.put("/approve/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isApproved = true;
    product.approvalStatus = "Approved";
    await product.save();

    res.json({ message: "Product approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error approving product" });
  }
});

/**
 * ❌ Reject a product
 */
router.put("/reject/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isApproved = false;
    product.approvalStatus = "Rejected";
    await product.save();

    res.json({ message: "Product rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting product" });
  }
});

export default router;
