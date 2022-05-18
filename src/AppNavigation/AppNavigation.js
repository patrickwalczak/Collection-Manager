import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AppContext from "../store/app-context";
import { useContext } from "react";
import SwitchThemeButton from "./SwitchThemeButton";
import { FormattedMessage } from "react-intl";
import SelectLanguage from "./SelectLanguage";

const AppNavigation = ({ changeLanguage, language }) => {
  const navLinkMargin = "text-white mx-1 mx-md-2  nav-link";
  const navBtnMarPad = "text-white p-1 p-md-2 mx-1 mx-md-2 mx-lg-3";

  const { logout, userId, token, userType, changeTheme, theme } =
    useContext(AppContext);

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
          <Link to="/mainPage" className="navbar-brand text-white">
            <FormattedMessage id="app-navigation.home.button" />
          </Link>

          <Navbar.Toggle aria-controls="tooglemenu" />
          <Navbar.Collapse className="justify-content-end" id="tooglemenu">
            <Nav className="align-items-center">
              {!userId && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${navLinkMargin}  nav-link` + (isActive ? " active" : "")
                  }
                >
                  <FormattedMessage id="app-navigation.login.button" />
                </NavLink>
              )}
              {!userId && (
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${navLinkMargin}  nav-link` + (isActive ? " active" : "")
                  }
                >
                  <FormattedMessage id="app-navigation.signup.button" />
                </NavLink>
              )}

              {userId && (
                <NavLink
                  to={`/user/${userId}`}
                  className={({ isActive }) =>
                    `${navLinkMargin}  nav-link` + (isActive ? " active" : "")
                  }
                >
                  <FormattedMessage id="app-navigation.collections.button" />
                </NavLink>
              )}

              {!!token && userType === "admin" && (
                <NavLink
                  to="/adminpanel"
                  className={({ isActive }) =>
                    `${navLinkMargin}  nav-link` + (isActive ? " active" : "")
                  }
                >
                  <FormattedMessage id="app-navigation.adminpanel.button" />
                </NavLink>
              )}

              {userId && (
                <Button
                  onClick={logout}
                  variant="dark"
                  className={navBtnMarPad}
                >
                  <FormattedMessage id="app-navigation.logout.button" />
                </Button>
              )}

              <SwitchThemeButton changeTheme={changeTheme} theme={theme} />

              <SelectLanguage
                language={language}
                changeLanguage={changeLanguage}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
};

export default AppNavigation;
