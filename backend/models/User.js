import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    googleId: String, // for Google login
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
