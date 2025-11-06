import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user-products/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user-products/cart/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart 🛒</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="row">
          {cart.map((item) => (
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
                    onClick={() => removeFromCart(item._id)}
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

export default Cart;
