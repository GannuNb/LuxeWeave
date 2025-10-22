import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("sellerToken");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/my-orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Orders</h3>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Product</th>
            <th>Buyer</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.product?.name}</td>
              <td>{o.buyer?.name}</td>
              <td>{o.quantity}</td>
              <td>₹{o.totalPrice}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyOrders;
