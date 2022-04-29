import { Routes, Route } from "react-router-dom";
import AppNavigation from "./AppNavigation/AppNavigation";
import { Fragment } from "react";
import Login from "./Login/Login";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Container
      style={{
        minHeight: "100vh",
        backgroundColor: "#00203FFF",
        paddingTop: "5rem",
      }}
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <AppNavigation />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
