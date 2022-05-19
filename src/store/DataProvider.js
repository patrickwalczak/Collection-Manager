import AppContext from "./app-context";
import { useState, useEffect } from "react";

import locales from "../localization/locales";
import enMessages from "../localization/en.json";
import plMessages from "../localization/pl.json";

const DataProvider = (props) => {
  const messages = {
    [locales.EN]: enMessages,
    [locales.PL]: plMessages,
  };

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [userType, setUserType] = useState(null);
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState(locales.EN);

  const logIn = ({ token, userId, username, userType }) => {
    setToken(token);
    setUserId(userId);
    setUsername(username);
    setUserType(userType);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setUserType(null);
  };

  const checkUser = (uid, msg) => {
    if (uid !== userId) return;
    logout();
    setShowModal(true);
    setModalText(msg);
  };

  const changeTheme = (theme) => {
    setTheme(theme);
  };

  const setAppLanguage = (language) => {
    if (language === "EN") {
      localStorage.setItem("language", JSON.stringify("EN"));
      setLanguage(locales.EN);
    }
    if (language === "PL") {
      setLanguage(locales.PL);
      localStorage.setItem("language", JSON.stringify("PL"));
    }
  };

  const changeLanguage = (language) => setAppLanguage(language);

  useEffect(() => {
    changeTheme("dark");
    if (theme) return;
    const defaultTheme = localStorage.getItem("theme");
    if (!defaultTheme || (defaultTheme !== "dark" && defaultTheme !== "light"))
      changeTheme("dark");
    changeTheme(defaultTheme);
  }, []);

  useEffect(() => {
    const defaultLanguage = JSON.parse(localStorage.getItem("language"));
    if (!defaultLanguage) return;
    if (defaultLanguage === "EN") setLanguage(locales.EN);
    if (defaultLanguage === "PL") setLanguage(locales.PL);
  }, []);

  const appContext = {
    username,
    userId,
    token,
    userType,
    theme,
    language,
    messages,
    logIn,
    logout,
    checkUser,
    changeTheme,
    changeLanguage,
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default DataProvider;
