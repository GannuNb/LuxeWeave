import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

function ProductSpecification() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!product) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("❌ Fetch error:", err));
    }
  }, [id, product]);

  const addToCart = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user-products/cart/add`,
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Added to cart!");
    } catch (err) {
      alert("❌ Already in cart or server error");
    }
  };

  const addToWishlist = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user-products/wishlist/add`,
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("❤️ Added to wishlist!");
    } catch (err) {
      alert("❌ Already in wishlist or server error");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          {product.image ? (
            <img
              src={
                product.image.startsWith("data:")
                  ? product.image
                  : `${process.env.REACT_APP_API_URL}/products/image/${product._id}`
              }
              alt={product.name}
              className="img-fluid rounded shadow"
            />
          ) : (
            <div className="bg-light text-center rounded p-5">No Image</div>
          )}
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4>₹{product.price}</h4>
          <p>{product.description}</p>

          <button className="btn btn-outline-primary me-2" onClick={addToCart}>
            🛒 Add to Cart
          </button>
          <button className="btn btn-outline-danger" onClick={addToWishlist}>
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSpecification;
