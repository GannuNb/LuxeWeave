import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

/**
 * 🛒 Add to Cart
 */
router.post("/cart/add", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId || req.user._id || req.user.id;

    if (!userId) return res.status(400).json({ message: "Invalid token" });

    const existing = await Cart.findOne({ userId, productId });
    if (existing)
      return res.status(400).json({ message: "Product already in cart" });

    const item = new Cart({ userId, productId, quantity: 1 });
    await item.save();

    res.json({ message: "✅ Added to cart" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🛒 Get Cart
 */
router.get("/cart", authMiddleware, async (req, res) => {
  try {
    // ✅ Support multiple userId property names
    const userId = req.user.userId || req.user._id || req.user.id;

    if (!userId) return res.status(400).json({ message: "Invalid token" });

    // ✅ Populate full product details
    const items = await Cart.find({ userId })
      .populate({
        path: "productId",
        select: "name price category image",
      })
      .lean();

    // ✅ Convert image binary data to base64 string for frontend
    const formatted = items.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      product: item.productId
        ? {
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            category: item.productId.category,
            image: item.productId.image?.data
              ? `data:${item.productId.image.contentType};base64,${item.productId.image.data.toString("base64")}`
              : null,
          }
        : null,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ❌ Remove Cart Item
 */
router.delete("/cart/remove/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id || req.user.id;
    await Cart.findOneAndDelete({ _id: req.params.id, userId });
    res.json({ message: "🗑️ Removed from cart" });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ❤️ Add to Wishlist
 */
router.post("/wishlist/add", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId || req.user._id || req.user.id;

    if (!userId) return res.status(400).json({ message: "Invalid token" });

    const existing = await Wishlist.findOne({ userId, productId });
    if (existing)
      return res.status(400).json({ message: "Product already in wishlist" });

    const item = new Wishlist({ userId, productId });
    await item.save();

    res.json({ message: "❤️ Added to wishlist" });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ❤️ Get Wishlist
 */
router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id || req.user.id;

    if (!userId) return res.status(400).json({ message: "Invalid token" });

    const items = await Wishlist.find({ userId })
      .populate({
        path: "productId",
        select: "name price category image",
      })
      .lean();

    const formatted = items.map((item) => ({
      _id: item._id,
      product: item.productId
        ? {
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            category: item.productId.category,
            image: item.productId.image?.data
              ? `data:${item.productId.image.contentType};base64,${item.productId.image.data.toString("base64")}`
              : null,
          }
        : null,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ❌ Remove from Wishlist
 */
router.delete("/wishlist/remove/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id || req.user.id;
    await Wishlist.findOneAndDelete({ _id: req.params.id, userId });
    res.json({ message: "🗑️ Removed from wishlist" });
  } catch (err) {
    console.error("Error removing wishlist item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
