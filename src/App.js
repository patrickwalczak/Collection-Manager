import NewCollection from "./NewCollection/NewCollection";
import { Routes, Route, Link } from "react-router-dom";
import AppNavigation from "./AppNavigation/AppNavigation";
import { Fragment } from "react";
import Login from "./Login/Login";

function App() {
  return (
    <Fragment>
      <AppNavigation />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Fragment>
  );
}

export default App;
