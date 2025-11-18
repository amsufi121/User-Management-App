import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <div class="container">
        <div id="logo">User Management App</div>
        <nav>
          <ul class="nav-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Create User</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
