import React, { useContext } from "react";
import styles from "../../assets/css/NavbarMenu.module.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/img/logo.png";
import profile from '../../assets/icon/profile.svg'
import logoutIcon from "../../assets/icon/logout.svg";
import clsx from "clsx";

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
    <Navbar expand="md" variant="light" className={styles.navbar}>
      <Navbar.Brand className={clsx(styles.fontWeightBorder, styles.whiteFont)}>
        <img
          src={logo}
          alt="logo"
          width="37"
          height="40"
          className={clsx(styles.mr1, styles.ml1, styles.whiteFont)}
        />
        Note App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.mr1} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles.mrAuto}>
          <Nav.Link
            className={clsx(
              styles.fontWeightBorder,
              styles.ml1,
              styles.whiteFont
            )}
            to="/linkcard"
            as={Link}
          >
            Card
          </Nav.Link>
          <Nav.Link
            className={clsx(
              styles.fontWeightBorder,
              styles.ml1,
              styles.whiteFont
            )}
            to="/note"
            as={Link}
          >
            Note
          </Nav.Link>
          <Nav.Link
            className={clsx(
              styles.fontWeightBorder,
              styles.ml1,
              styles.whiteFont
            )}
            to="/circle"
            as={Link}
          >
            Lunch Today
          </Nav.Link>
          <Nav.Link
            className={clsx(
              styles.fontWeightBorder,
              styles.ml1,
              styles.whiteFont
            )}
            to="/author"
            as={Link}
          >
            Author
          </Nav.Link>
        </Nav>
        <Nav className={styles.mr1}>
          <Nav.Link
            className={clsx(
              styles.fontWeightBorder,
              styles.ml1,
              styles.whiteFont
            )}
            to="/profile"
            as={Link}
          >
            <img src={profile} alt="avatar" className={styles.avatar}/>
            Welcome {name}
          </Nav.Link>
          <Button
            className={clsx(styles.ml1, styles.logoutBtn)}
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logout"
              width="23"
              height="23"
              className={styles.mr1}
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarMenu;
