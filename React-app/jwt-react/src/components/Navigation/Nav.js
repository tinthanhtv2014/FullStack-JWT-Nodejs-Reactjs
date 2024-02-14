import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
const Nav = (props) => {
  return (
    <nav className="topnav">
      <a href="/" exact>
        Home
      </a>
      <a href="/contact">Contact</a>
      <a href="/about">About</a>
      <a href="/news">News</a>
    </nav>
  );
};
export default Nav;
