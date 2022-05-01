import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AppNavigation = () => {
  const navLinkMargin = "text-white mx-1 mx-md-2  nav-link";
  const navBtnMarPad = "text-white p-1 p-md-2 mx-1 mx-md-2 mx-lg-3";

  return (
    <Row style={{ height: "4rem" }}>
      <Col>
        <Navbar
          fixed="top"
          className="px-lg-4 px-md-3 px-2 mb-0 fw-bold"
          style={{
            backgroundColor: "#ADEFD1FF",
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

              {true && (
                <NavLink
                  to="/1/collections"
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
      </Col>
    </Row>
  );
};

export default AppNavigation;
