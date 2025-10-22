import express from "express";
import multer from "multer";
import Product from "../models/Product.js";
import { sellerAuthMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer to use memory storage (keeps file in RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * 🟢 Add Product (Image stored as Buffer in MongoDB)
 */
router.post(
  "/products",
  sellerAuthMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, category } = req.body;

      const newProduct = new Product({
        sellerId: req.seller.id,
        name,
        description,
        price,
        category,
        image: req.file
          ? {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            }
          : null,
      });

      await newProduct.save();
      res.status(201).json({ message: "✅ Product added successfully!" });
    } catch (err) {
      res.status(500).json({
        message: "❌ Error adding product",
        error: err.message,
      });
    }
  }
);

/**
 * ✏️ Update Product
 */
router.put(
  "/products/:id",
  sellerAuthMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        sellerId: req.seller.id,
      });

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      const { name, description, price, category } = req.body;
      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (category) product.category = category;

      if (req.file) {
        product.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      await product.save();
      res.json({ message: "Product updated successfully", product });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating product", error: err.message });
    }
  }
);

/**
 * 🗑️ Delete Product
 */
router.delete("/products/:id", sellerAuthMiddleware, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      sellerId: req.seller.id,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
});

/**
 * 📦 Get Seller's Products
 */
router.get("/my-products", sellerAuthMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.seller.id });

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
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});

export default router;
