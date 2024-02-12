import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
const Nav = (props) => {
  return (
    <nav className="topnav">
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/news">News</NavLink>
    </nav>
  );
};
export default Nav;
