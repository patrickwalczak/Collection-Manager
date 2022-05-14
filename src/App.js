import { Routes, Route, Navigate } from "react-router-dom";
import AppNavigation from "./AppNavigation/AppNavigation";
import Login from "./Login/Login";
import Container from "react-bootstrap/Container";
import SignUp from "./SignUp/SignUp";
import UserProfile from "./UserProfile/UserProfile";
import CollectionView from "./Collection/CollectionView";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NewCollection from "./NewCollection/NewCollection";
import AppContext from "./store/app-context";
import { useContext } from "react";
import AdminPanel from "./AdminPanel/AdminPanel";

function App() {
  const { userId, userType, token } = useContext(AppContext);

  return (
    <Container
      style={{
        minHeight: "100vh",
        backgroundColor: "#00203FFF",
      }}
      fluid
      className="position-relative gap-5 pb-5"
    >
      <AppNavigation />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/collection/:collectionId" element={<CollectionView />} />
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
  );
}

export default App;
