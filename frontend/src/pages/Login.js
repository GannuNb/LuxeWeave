import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Email/Phone + Password Login
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      form
    );

    setMessage(res.data.message);
    localStorage.setItem("token", res.data.token);

    // Force redirect + refresh in one go
    window.location.href = "/";
  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || "Login failed");
  }
};


  // Google Login
// Google Login
const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google user:", decoded);

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/google`,
      { token: credentialResponse.credential }
    );

    setMessage(res.data.message);
    localStorage.setItem("token", res.data.token);

    // Force redirect + refresh (same as email login)
    window.location.href = "/";
  } catch (err) {
    console.error(err);
    setMessage("Google login failed");
  }
};


  const handleGoogleFailure = () => {
    setMessage("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login</h2>

            {message && <div className="alert alert-info text-center">{message}</div>}

            {/* Google Login */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />

            <hr />
            <p className="text-center">Or use Email / Phone + Password</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email or Phone</label>
                <input
                  type="text"
                  name="emailOrPhone"
                  className="form-control"
                  value={form.emailOrPhone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <p className="text-center mt-3">
              Don’t have an account? <a href="/signup">Signup</a>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
