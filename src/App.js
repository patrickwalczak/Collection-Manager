import { Routes, Route, Navigate } from "react-router-dom";
import AppNavigation from "./AppNavigation/AppNavigation";
import Login from "./Login/Login";
import Container from "react-bootstrap/Container";
import SignUp from "./SignUp/SignUp";
import UserProfile from "./UserProfile/UserProfile";
import CollectionView from "./Collection/CollectionView";
import NewCollection from "./NewCollection/NewCollection";
import AppContext from "./store/app-context";
import { useContext, useEffect, useState } from "react";
import AdminPanel from "./AdminPanel/AdminPanel";
import { IntlProvider } from "react-intl";

function App() {
  const {
    userId,
    userType,
    token,
    theme,
    changeTheme,
    language,
    messages,
    changeLanguage,
  } = useContext(AppContext);

  useEffect(() => {
    changeTheme("dark");
    if (theme) return;
    const defaultTheme = localStorage.getItem("theme");
    if (!defaultTheme || (defaultTheme !== "dark" && defaultTheme !== "light"))
      changeTheme("dark");
    changeTheme(defaultTheme);
  }, []);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <Container
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--appBackground)",
        }}
        fluid
        data-theme={theme}
        className="position-relative gap-5 pb-5"
      >
        <AppNavigation language={language} changeLanguage={changeLanguage} />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/collection/:collectionId"
            element={<CollectionView />}
          />
          {!!token && userId && (
            <Route path="/:userId/newcollection" element={<NewCollection />} />
          )}
          <Route path="*" element={<Navigate replace to="/login" />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          {!!token && userType === "admin" && (
            <Route path="/adminpanel" element={<AdminPanel />} />
          )}
        </Routes>
      </Container>
    </IntlProvider>
  );
}

export default App;
