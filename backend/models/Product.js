import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSeller",
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    image: {
      data: Buffer, // Binary data (image stored directly)
      contentType: String, // e.g., image/png
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
