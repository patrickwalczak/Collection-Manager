import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { FormattedMessage } from "react-intl";

const ErrorAlert = ({ requestError, retryRequest }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>{requestError}</Alert.Heading>
      <div className="mt-3 d-flex justify-content-end">
        <Button variant="outline-danger" onClick={retryRequest}>
          <FormattedMessage id="try.again" />
        </Button>
      </div>
    </Alert>
  );
};
export default ErrorAlert;
