import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("sellerToken");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/sellerrouting/my-products`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Products</h3>
      <div className="row mt-3">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card mb-3">
              <img
                src={p.image || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>₹{p.price}</p>
                <p>{p.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProducts;
