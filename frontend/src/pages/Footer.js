import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} LUXE WAVE</p>
        <div>
          <a href="/" className="text-light me-3">Home</a>
          <a href="/about" className="text-light me-3">About</a>
          <a href="/contact" className="text-light">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
