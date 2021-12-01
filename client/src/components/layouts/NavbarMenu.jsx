import React, { useContext } from "react";
import "../../assets/css/NavbarMenu.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/img/logo.png";
import logoutIcon from "../../assets/icon/logout.svg";

function NavbarMenu() {
  //Context
  const {
    authState: {
      user: { name },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand="md" variant="light" className="navbar">
      <Navbar.Brand className="font-weight-border text-white">
        <img
          src={logo}
          alt="logo"
          width="37"
          height="40"
          className="ml-1 mr-1"
        />
        Note App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-1" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-border text-white ml-1"
            to="/linkcard"
            as={Link}
          >
            Card
          </Nav.Link>
          <Nav.Link
            className="font-weight-border text-white ml-1"
            to="/note"
            as={Link}
          >
            Note
          </Nav.Link>
          <Nav.Link
            className="font-weight-border text-white ml-1"
            to="/circle"
            as={Link}
          >
            Lunch Today
          </Nav.Link>
        </Nav>
        <Nav className="mr-1">
          <Nav.Link
            className="font-weight-border text-white ml-1"
            to="/profile"
            as={Link}
          >
            Welcome {name}
          </Nav.Link>
          <Button className="text-white ml-1 logout-btn" onClick={logout}>
            <img
              src={logoutIcon}
              alt="logout"
              width="23"
              height="23"
              className="mr-1"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarMenu;
