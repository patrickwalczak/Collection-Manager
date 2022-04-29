import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Fragment } from "react";

const AppNavigation = () => {
  const navLinkMargin = "mx-1 mx-md-2  nav-link";
  const navBtnMarPad = "p-1 p-md-2 mx-1 mx-md-2 mx-lg-3";

  return (
    <Fragment>
      <Navbar
        className="px-lg-4 px-md-3 px-2 mb-md-3 mb-1"
        style={{
          backgroundColor: "#ADEFD1FF",
          fontWeight: "600",
        }}
        expand="sm"
      >
        <Link to="/home" className="navbar-brand">
          HOME
        </Link>

        <Navbar.Toggle aria-controls="tooglemenu" />
        <Navbar.Collapse className="justify-content-end" id="tooglemenu">
          <Nav className="align-items-center">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${navLinkMargin}  nav-link` + (isActive ? " active" : "")
              }
            >
              Log In
            </NavLink>
            <NavLink
              to="/signUp"
              className={({ isActive }) =>
                `${navLinkMargin}  nav-link` + (isActive ? " active" : "")
              }
            >
              Sign Up
            </NavLink>

            {false && (
              <NavLink
                to="/collections"
                className={({ isActive }) =>
                  `${navLinkMargin}  nav-link` + (isActive ? " active" : "")
                }
              >
                MyCollections
              </NavLink>
            )}

            {false && <Button className={navBtnMarPad}>Log Out</Button>}

            <Button className={navBtnMarPad}>Dark/Light</Button>

            <Button className={navBtnMarPad}>Language</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default AppNavigation;
