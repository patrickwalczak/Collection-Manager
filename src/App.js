import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import AppNavigation from "./AppNavigation/AppNavigation";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import CollectionView from "./Collection/CollectionView";
import NewCollection from "./pages/NewCollection";
import AdminPanel from "./pages/AdminPanel";
import ItemView from "./pages/ItemView";
import MainPage from "./pages/MainPage";
import ModalTemplate from "./UI/ModalTemplate";
import SearchController from "./Search/SearchController";
import ItemsByTag from "./pages/ItemsByTag";

import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { IntlProvider } from "react-intl";

import AppContext from "./store/app-context";

function App() {
  const [searchModalVisibility, setSearchModalVisibility] = useState(false);

  const {
    userId,
    userType,
    token,
    theme,
    language,
    messages,
    changeLanguage,
    modalText,
    showModal,
    resetLogOutModal,
  } = useContext(AppContext);

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
        className="themeClass overflow-auto scrollBar position-relative gap-5 pb-5"
      >
        <AppNavigation
          openSearchModal={openSearchModal}
          language={language}
          changeLanguage={changeLanguage}
        />

        <ModalTemplate
          modalState={searchModalVisibility}
          handleCloseModal={closeSearchModal}
          modalHeading={"Search for items in collections"}
          fullscreen={true}
        >
          <SearchController closeModal={closeSearchModal} />
        </ModalTemplate>

        <ModalTemplate
          modalState={showModal}
          handleCloseModal={resetLogOutModal}
          modalHeading={modalText}
        >
          <Button onClick={resetLogOutModal}>OK</Button>
        </ModalTemplate>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/foundItems/:tag" element={<ItemsByTag />} />
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
