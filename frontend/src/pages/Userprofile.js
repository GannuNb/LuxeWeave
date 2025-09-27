import React, { useEffect, useState } from "react";
import axios from "axios";

function Userprofile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h3>Please login to view profile</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h3 className="mb-3">User Profile</h3>
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
      </div>
    </div>
  );
}

export default Userprofile;
