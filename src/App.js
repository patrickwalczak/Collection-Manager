import { Routes, Route, Navigate } from "react-router-dom";
import AppNavigation from "./AppNavigation/AppNavigation";
import { Fragment } from "react";
import Login from "./Login/Login";
import Container from "react-bootstrap/Container";
import SignUp from "./SignUp/SignUp";

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Container>
  );
}

export default App;
