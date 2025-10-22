import mongoose from "mongoose";

const userSellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    shopName: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("UserSeller", userSellerSchema);
