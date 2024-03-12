import React, { useEffect, useState, useContext } from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Nav = (props) => {
  const { user } = React.useContext(UserContext);
  let location = useLocation();

  // const [isShow, setIsShow] = useState(true);

  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");

  //   if (location.pathname === "/login") {
  //     setIsShow(false);
  //   }
  // }, []);
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        <nav className="topnav">
          <a href="/" exact>
            Home
          </a>
          <a href="/users">Users</a>
          <a href="/project">Projects</a>
          <a href="/news">News</a>
        </nav>
      </>
    );
  } else {
    return <></>;
  }
};
export default Nav;
