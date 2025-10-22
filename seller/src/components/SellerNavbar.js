import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SellerNavbar() {
  const navigate = useNavigate();
  const seller = JSON.parse(localStorage.getItem("sellerInfo"));

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("sellerInfo");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid px-4">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
          🛍️ SellerPanel
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/my-products">
                My Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/my-orders">
                My Orders
              </Link>
            </li>
          </ul>

          {/* Right side profile dropdown */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#!"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="profile"
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                {seller?.name || "Seller"}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end shadow"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    View Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SellerNavbar;
