import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="left">User Management Application</div>

        <nav className="nav">
          <Link to="/">Home</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
