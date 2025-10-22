import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { sellerAuthMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🧾 Get Orders for Seller’s Products
router.get("/my-orders", sellerAuthMiddleware, async (req, res) => {
  try {
    const sellerProducts = await Product.find({ sellerId: req.seller.id });
    const productIds = sellerProducts.map((p) => p._id);

    const orders = await Order.find({ product: { $in: productIds } })
      .populate("product")
      .populate("buyer", "name email");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
});

export default router;
