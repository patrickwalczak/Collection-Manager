import { Routes, Route, Navigate } from "react-router-dom";
import AppNavigation from "./AppNavigation/AppNavigation";
import Login from "./Login/Login";
import Container from "react-bootstrap/Container";
import SignUp from "./SignUp/SignUp";
import Collections from "./Collections/Collections";
import CollectionView from "./Collection/CollectionView";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NewCollection from "./NewCollection/NewCollection";

function App() {
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
        <Route path="/collection" element={<CollectionView />} />
        <Route path="/newcollection" element={<NewCollection />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
        <Route path="/:uid/collections" element={<Collections />} />
      </Routes>
    </Container>
  );
}

export default App;
