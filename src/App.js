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
import ItemView from "./ItemView/ItemView";
import { IntlProvider } from "react-intl";
import MainPage from "./MainPage/MainPage";
import SearchModal from "./Search/SearchModal";

function App() {
  const [searchModalVisibility, setSearchModalVisibility] = useState(false);

  const { userId, userType, token, theme, language, messages, changeLanguage } =
    useContext(AppContext);

  const openSearchModal = () => setSearchModalVisibility(true);

  const closeSearchModal = () => setSearchModalVisibility(false);

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
        <AppNavigation
          openSearchModal={openSearchModal}
          language={language}
          changeLanguage={changeLanguage}
        />
        <SearchModal
          modalVisibility={searchModalVisibility}
          closeModal={closeSearchModal}
        />

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
          <Route path="*" element={<Navigate replace to="/mainPage" />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/item/:itemId" element={<ItemView />} />
          {!!token && userType === "admin" && (
            <Route path="/adminpanel" element={<AdminPanel />} />
          )}
        </Routes>
      </Container>
    </IntlProvider>
  );
}

export default App;
