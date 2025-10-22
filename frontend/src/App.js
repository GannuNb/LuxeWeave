// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Userprofile from "./pages/Userprofile";
import Footer from "./pages/Footer";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
