import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

import { useContext } from "react";

import AppContext from "../../shared/context/app-context";

const CenteredSpinner = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className="position-absolute start-50 top-50">
      <Spinner
        animation="border"
        variant={theme === "dark" ? "light" : "dark"}
      />
    </div>
  );
};
export default CenteredSpinner;
