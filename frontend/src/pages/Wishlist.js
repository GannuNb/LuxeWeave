import React, { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user-products/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user-products/wishlist/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWishlist();
    } catch (err) {
      console.error("Error removing wishlist item:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Your Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="card h-100">
                {item.product.image && (
                  <img src={item.product.image} className="card-img-top" alt={item.product.name} />
                )}
                <div className="card-body">
                  <h5>{item.product.name}</h5>
                  <p>₹{item.product.price}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
