import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import ModalTemplate from "../../UI/ModalTemplate";

import { useCallback, useEffect, useState, useContext } from "react";

import useHttp from "../../hooks/useHttp";

import AppContext from "../../store/app-context";

const ConfirmOperationModal = ({
  modalVisibilityState,
  handleCloseModal,
  token,
  triggerUpdate,
  requestBodyObject,
  clearState,
  url,
  method,
  modalQuestion,
  loggedUserId,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { logOutAdmin } = useContext(AppContext);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const resetComponent = () => {
    handleCloseModal();
    resetHookState();
    clearState();
    setSuccessMessage("");
  };

  const handleLogOutAdmin = (message) => {
    handleCloseModal();
    logOutAdmin(message);
  };

  const deleteUsers = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/${url}`,
        {
          method,
          body: JSON.stringify(requestBodyObject),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";

      setSuccessMessage(returnedData.message);
      setIsDeleting(false);

      const findLoggedUser = requestBodyObject?.users.find(
        (id) => id === loggedUserId
      );

      if (requestBodyObject?.status === "blocked" && !!findLoggedUser)
        handleLogOutAdmin("Your account has been blocked");

      if (requestBodyObject?.userType === "user" && !!findLoggedUser)
        handleLogOutAdmin("You have been removed from admins");
      if (method === "DELETE" && !!findLoggedUser)
        handleLogOutAdmin("Your account has been deleted");

      triggerUpdate();
    } catch (err) {
      setIsDeleting(false);
    }
  }, []);

  const triggerRequestAgain = () => {
    resetHookState();
    setIsDeleting(true);
  };

  useEffect(() => {
    if (!isDeleting || !!requestStatus) return;
    deleteUsers();
  }, [deleteUsers, requestStatus, isDeleting]);

  const isDisabled = requestStatus === "loading" ? true : false;

  return (
    <ModalTemplate
      modalHeading="Confirm your operation"
      modalState={modalVisibilityState}
      handleCloseModal={resetComponent}
    >
      {!successMessage && <h2>{modalQuestion}</h2>}
      {requestError !== null && requestStatus !== "loading" && (
        <Alert variant="danger">
          <Alert.Heading>{requestError}</Alert.Heading>
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="outline-danger" onClick={triggerRequestAgain}>
              Try again
            </Button>
          </div>
        </Alert>
      )}
      {!successMessage && !requestError && (
        <div className="d-flex justify-content-end gap-3">
          <Button
            className="col-2"
            variant="secondary"
            type="button"
            disabled={isDisabled}
            onClick={resetComponent}
          >
            Cancel
          </Button>
          <Button
            disabled={isDisabled}
            className="col-4"
            variant="danger"
            type="button"
            onClick={() => setIsDeleting(true)}
          >
            {!isDisabled && "Yes"}
            {isDisabled && <Spinner animation="border" />}
          </Button>
        </div>
      )}
      {!!successMessage && (
        <Alert variant="success">
          <Alert.Heading>{successMessage}</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={resetComponent} variant="outline-success">
              Great!
            </Button>
          </div>
        </Alert>
      )}
    </ModalTemplate>
  );
};
export default ConfirmOperationModal;