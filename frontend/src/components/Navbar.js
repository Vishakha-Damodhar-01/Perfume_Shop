import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure you create this file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h2>PERFUME SHOP</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collections">Collections</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="nav-icons">
        <button className="cart-btn">🛒</button>
      </div>
    </nav>
  );
}

export default Navbar;
