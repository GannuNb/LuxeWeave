import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

let otpStore = {}; // temporary in-memory OTP store


import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST: Google login/signup
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload; // sub = Google userId

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        password: null, // Google login doesn't need password
        phone: null,
        googleId: sub,
      });
      await user.save();
    }

    // Issue JWT
    const ourToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Google login success",
      token: ourToken,
      user,
    });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(401).json({ message: "Invalid Google token" });
  }
});



// 📲 POST: Send OTP
router.post("/send-otp", async (req, res) => {
  let { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  // ✅ Ensure phone is in E.164 format (+91xxxxxxxxxx)
  if (!phone.startsWith("+")) {
    phone = "+91" + phone;
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    const message = await client.messages.create({
      body: `Your OTP for Clothstore signup is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log(`✅ OTP sent to ${phone}. SID: ${message.sid}`);

    otpStore[phone] = otp; // save OTP temporarily

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ OTP Send Failed:", error.message);
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
});

// 📝 POST: Signup
router.post("/signup", async (req, res) => {
  let { name, email, password, phone, otp } = req.body;

  if (!name || !email || !password || !phone || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // ✅ Normalize phone number (same as send-otp)
  if (!phone.startsWith("+")) {
    phone = "+91" + phone;
  }

  if (otpStore[phone] != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    delete otpStore[phone]; // remove OTP after successful signup

    res.status(201).json({ message: "Signup successful. Please login." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// 🟢 POST: Email/Phone + Password Login
router.post("/login", async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res.status(400).json({ message: "Email/Phone and password are required" });
  }

  try {
    // Find by email OR phone
    let user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    // If user has no password (Google-only account)
    if (!user.password) {
      return res.status(400).json({ message: "Please login with Google" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT (expires in 24h)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});






router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "User profile accessed successfully",
    user: req.user, // comes from token
  });
});




router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});


export default router;
