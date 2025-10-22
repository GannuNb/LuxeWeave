import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/all-products`);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">🛍️ Available Products</h3>

      <div className="row">
        {products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          products.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card shadow-sm h-100">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="bg-light d-flex justify-content-center align-items-center"
                    style={{ height: "250px" }}
                  >
                    <span>No Image</span>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="text-muted">Category: {p.category}</p>
                  <h6>💰 ₹{p.price}</h6>
                  <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
                    Seller: {p.seller}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
