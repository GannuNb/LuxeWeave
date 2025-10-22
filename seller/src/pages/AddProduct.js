import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("sellerToken");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("image", form.image);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/sellerrouting/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ Product added successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
    } catch (err) {
      setMessage("❌ Failed to add product");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-3"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="form-control mb-3"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          className="form-control mb-3"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          className="form-control mb-3"
          onChange={handleChange}
          accept="image/*"
          required
        />
        <button className="btn btn-success w-100" type="submit">
          Add Product
        </button>
        <p className="mt-3 text-center">{message}</p>
      </form>
    </div>
  );
}

export default AddProduct;
