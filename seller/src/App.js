import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import SellerLogin from "./pages/SellerLogin";
import SellerSignup from "./pages/SellerSignup";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import MyOrders from "./pages/MyOrders";
import SellerNavbar from "./components/SellerNavbar";

function App() {
  return (
    <Router>
      <SellerNavbar />
      <Routes>
        <Route path="/" element={<SellerLogin />} />
        <Route path="/login" element={<SellerLogin />} />
        <Route path="/sellersignup" element={<SellerSignup />} />
        <Route path="/dashboard" element={<SellerDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
