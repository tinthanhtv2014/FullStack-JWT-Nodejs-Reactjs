import React, { useEffect, useState, useContext } from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import logo from "../../logo512.png";
const NavHeader = (props) => {
  const { user } = React.useContext(UserContext);
  let location = useLocation();

  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        <div className="nav-header">
          {" "}
          <Navbar expand="lg" className="bg-body-tertiary bg-header">
            <Container>
              <Navbar.Brand href="#home">
                {" "}
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  // alt="React Bootstrap logo"
                />
                React-Bootstrap
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink className="nav-link" to="/" exact>
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                  <NavLink className="nav-link" to="/projects">
                    Projects
                  </NavLink>
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  <Nav.Item href="#deets" className="nav-link">
                    Welcome Back
                  </Nav.Item>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Change Password
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
export default NavHeader;
