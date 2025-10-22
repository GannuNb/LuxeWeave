import React from "react";
import { Link } from "react-router-dom";

function SellerDashboard() {
  return (
    <div className="container mt-5">
      <h2>Welcome Seller</h2>
      <hr />
      <div className="d-flex flex-column gap-3 mt-3">
        <Link to="/add-product" className="btn btn-success">
          ➕ Add New Product
        </Link>
        <Link to="/my-products" className="btn btn-info">
          📦 View My Products
        </Link>
        <Link to="/my-orders" className="btn btn-warning">
          🧾 View My Orders
        </Link>
      </div>
    </div>
  );
}

export default SellerDashboard;
