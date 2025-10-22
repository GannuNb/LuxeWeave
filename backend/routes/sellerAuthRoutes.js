import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserSeller from "../models/UserSeller.js";

const router = express.Router();

// 🧾 Seller Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, shopName, address } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingSeller = await UserSeller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = new UserSeller({
      name,
      email,
      password: hashedPassword,
      phone,
      shopName,
      address,
    });

    await newSeller.save();

    res.status(201).json({ message: "✅ Seller registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔐 Seller Login
router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const seller = await UserSeller.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: seller._id, role: "seller" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "✅ Login successful",
      token,
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        shopName: seller.shopName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
