import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import SelectLanguage from "./SelectLanguage";
import SwitchThemeButton from "./SwitchThemeButton";

import { FormattedMessage } from "react-intl";

import { AiOutlineSearch } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";

import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";

import AppContext from "../store/app-context";

const AppNavigation = ({ changeLanguage, language, openSearchModal }) => {
  const navLinkMargin = "mx-1 mx-md-2 nav-link";
  const navBtnMarPad = "py-1 px-3 mx-1 mx-md-2 mx-lg-3";

  const { logout, userId, token, userType, changeTheme, theme } =
    useContext(AppContext);

  return (
    <Row style={{ height: "4rem" }}>
      <Col>
        <Navbar
          fixed="top"
          className="px-lg-4 px-md-3 px-2 mb-0 fw-bold themeClass border-bottom"
          expand="lg"
        >
          <NavLink
            className={({ isActive }) =>
              "nav-link px-0 fs-5" + (isActive ? " active" : "")
            }
            to="/mainPage"
          >
            <AiFillHome />
          </NavLink>

          <Navbar.Toggle aria-controls="tooglemenu" />

          <Navbar.Collapse className="justify-content-end" id="tooglemenu">
            <Nav className="align-items-center">
              <Button
                onClick={openSearchModal}
                className="border rounded-pill themeClass btn-light py-0 px-2 d-flex gap-4 align-items-center"
              >
                <FormattedMessage id="app-navigation.search.button" />
                <AiOutlineSearch />
              </Button>

              {!userId && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    navLinkMargin + (isActive ? " active" : "")
                  }
                >
                  <FormattedMessage id="app-navigation.login.button" />
                </NavLink>
              )}
              {!userId && (
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    navLinkMargin + (isActive ? " active" : "")
                  }
                >
                  <FormattedMessage id="app-navigation.signup.button" />
                </NavLink>
              )}

              {userId && (
                <NavLink
                  to={`/user/${userId}`}
                  className={({ isActive }) =>
                    navLinkMargin + (isActive ? " active" : "")
                  }
                >
                  <FormattedMessage id="app-navigation.collections.button" />
                </NavLink>
              )}

              {!!token && userType === "admin" && (
                <NavLink
                  to="/adminpanel"
                  className={({ isActive }) =>
                    navLinkMargin + (isActive ? " active" : "")
                  }
                >
                  <FormattedMessage id="app-navigation.adminpanel.button" />
                </NavLink>
              )}

              {userId && (
                <Button
                  onClick={logout}
                  className={
                    navBtnMarPad + " themeClass btn-light rounded-pill"
                  }
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
