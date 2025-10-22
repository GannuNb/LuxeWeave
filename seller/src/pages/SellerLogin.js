import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/sellerauth/login`,
        form
      );

      // Save token in localStorage
      localStorage.setItem("sellerToken", res.data.token);
      localStorage.setItem("sellerInfo", JSON.stringify(res.data.seller));

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <div className="text-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Seller Login"
            width="70"
            className="mb-3"
          />
          <h3 className="fw-bold text-primary">Seller Login</h3>
          <p className="text-muted small">
            Manage your shop, products, and orders easily.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email or Phone</label>
            <input
              type="text"
              name="emailOrPhone"
              className="form-control form-control-lg"
              placeholder="Enter email or phone"
              value={form.emailOrPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary w-100 btn-lg mb-2" type="submit">
            Login
          </button>

          <div className="text-center">
            <small>
              Don’t have an account?{" "}
              <a href="/sellersignup" className="text-decoration-none text-success fw-semibold">
                Sign up
              </a>
            </small>
          </div>

          {message && (
            <div className="alert alert-info text-center mt-3 p-2" role="alert">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SellerLogin;
