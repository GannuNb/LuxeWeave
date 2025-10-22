import React from "react";
import homestyle from "../cssmodules/Home.module.css";

function Home() {
  return (
    <div>
      {/* ===== Carousel Section ===== */}
      <div
        id="homeCarousel"
        className={`carousel slide ${homestyle.homeCarousel}`}
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
               src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
              className="d-block w-100"
              alt="Banner 1"
            />
            <div
              className={`carousel-caption d-none d-md-block ${homestyle.carouselCaption}`}
            >
              <h3>Trendy Styles, Best Prices</h3>
              <p>Shop the latest fashion collection for all seasons</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80"
              className="d-block w-100"
              alt="Banner 2"
            />
            <div
              className={`carousel-caption d-none d-md-block ${homestyle.carouselCaption}`}
            >
              <h3>Fresh Arrivals</h3>
              <p>Discover your style with our exclusive new outfits</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80"
              className="d-block w-100"
              alt="Banner 3"
            />
            <div
              className={`carousel-caption d-none d-md-block ${homestyle.carouselCaption}`}
            >
              <h3>Shop. Style. Repeat.</h3>
              <p>Experience premium fashion at affordable prices</p>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      {/* ===== About Section ===== */}
      <section className={`container ${homestyle.aboutSection}`}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=800"
              alt="About us"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2>About Us</h2>
            <p className={homestyle.aboutText}>
              Welcome to <strong>ClothStore</strong> — your go-to destination for
              stylish, comfortable, and high-quality clothing. We curate the
              latest fashion trends and deliver them right to your doorstep.
            </p>
            <button className={`btn btn-primary mt-2 ${homestyle.aboutBtn}`}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ===== Latest Products ===== */}
      <section className={homestyle.latestProducts}>
        <div className="container">
          <h2 className="text-center mb-4">Latest Arrivals</h2>
          <div className="row g-4">
            {[
              {
                name: "Casual T-Shirt",
                price: "$25",
                img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Summer Dress",
                price: "$40",
                img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80",
              },
              {
                name: "Denim Jacket",
                price: "$55",
                img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
              },
            ].map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className={`card h-100 shadow-sm ${homestyle.productCard}`}>
                  <img
                    src={product.img}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="text-muted">{product.price}</p>
                    <button className="btn btn-outline-primary btn-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
