import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // fixed import

const Signup = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    otp: ""
  });
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      let phoneNumber = form.phone;
      if (!phoneNumber.startsWith("+")) phoneNumber = "+91" + phoneNumber;

      await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-otp`, {
        phone: phoneNumber,
      });

      setOtpSent(true);
      setMessage("OTP sent successfully to your phone.");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        form
      );
      setMessage(res.data.message);

      // ✅ Navigate to home page on successful signup
      if (res.status === 201) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

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

      // ✅ Navigate to home page after Google login
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Google login failed");
    }
  };

  const handleGoogleFailure = () => {
    setMessage("Google login failed");
  };

  return (
    <>
    
    <div className="mt-5">
      
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Sign Up / Login</h2>

            {message && <div className="alert alert-info text-center">{message}</div>}

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />

            <hr />
            <p className="text-center">Or use Email + OTP signup</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone (10 digits only)</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                {!otpSent && (
                  <button
                    type="button"
                    className="btn btn-warning mt-2"
                    onClick={sendOtp}
                  >
                    Send OTP
                  </button>
                )}
              </div>

              {otpSent && (
                <div className="mb-3">
                  <label className="form-label">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    className="form-control"
                    value={form.otp}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

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
                Create Account
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
    </div></>
  );
};

export default Signup;
