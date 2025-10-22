import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerSignup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        shopName: "",
        address: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/sellerauth/signup`,form
            );

            setMessage(res.data.message || "Signup successful ✅");
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            console.error("Signup error:", err.response?.data);
            setMessage(err.response?.data?.message || "Signup failed ❌");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <h3 className="text-center mb-4">Seller Signup</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" className="form-control mb-3"
                    value={form.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="form-control mb-3"
                    value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="form-control mb-3"
                    value={form.password} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" className="form-control mb-3"
                    value={form.phone} onChange={handleChange} required />
                <input type="text" name="shopName" placeholder="Shop Name" className="form-control mb-3"
                    value={form.shopName} onChange={handleChange} />
                <textarea name="address" placeholder="Shop Address" className="form-control mb-3"
                    value={form.address} onChange={handleChange}></textarea>

                <button className="btn btn-success w-100" type="submit">
                    Signup
                </button>
                {message && (
                    <p className={`mt-3 text-center ${message.includes("✅") ? "text-success" : "text-danger"}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default SellerSignup;
