import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/pending-products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching pending products");
    }
  };

  const handleApprove = async (id) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/admin/approve/${id}`);
    fetchPendingProducts();
  };

  const handleReject = async (id) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/admin/reject/${id}`);
    fetchPendingProducts();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Admin - Pending Product Approvals</h3>
      {products.length === 0 ? (
        <p className="text-center text-muted">No pending products</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="fw-bold">₹{p.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(p._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(p._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
