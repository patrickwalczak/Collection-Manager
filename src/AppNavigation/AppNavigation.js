import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Fragment } from "react";

const AppNavigation = () => {
  const navLinkMargin = "text-white mx-1 mx-md-2  nav-link";
  const navBtnMarPad = "text-white p-1 p-md-2 mx-1 mx-md-2 mx-lg-3";

  return (
    <Fragment>
      <Navbar
        fixed="top"
        className="px-lg-4 px-md-3 px-2 mb-0"
        style={{
          backgroundColor: "#ADEFD1FF",
          fontWeight: "600",
        }}
        expand="sm"
      >
        <Link to="/home" className="navbar-brand text-white">
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

            {false && (
              <Button variant="dark" className={navBtnMarPad}>
                Log Out
              </Button>
            )}

            <Button variant="dark" className={navBtnMarPad}>
              Dark/Light
            </Button>

            <Button variant="outline-dark" className={navBtnMarPad}>
              Language
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default AppNavigation;
