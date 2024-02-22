import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useLocation } from "react-router-dom";
const Nav = (props) => {
  const [isShow, setIsShow] = useState(true);
  let location = useLocation();
  useEffect(() => {
    let session = sessionStorage.getItem("account");

    if (location.pathname === "/login") {
      setIsShow(false);
    }
  }, []);
  return (
    <>
      {isShow === true && (
        <nav className="topnav">
          <a href="/" exact>
            Home
          </a>
          <a href="/users">Users</a>
          <a href="/project">Projects</a>
          <a href="/news">News</a>
        </nav>
      )}
    </>
  );
};
export default Nav;
