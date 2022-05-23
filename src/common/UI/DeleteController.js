import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import ModalTemplate from "./ModalTemplate";
import useHttp from "../../shared/hooks/useHttp";
import { useCallback, useEffect, useState } from "react";

const DeleteController = ({
  modalVisibilityState,
  handleCloseModal,
  token,
  urlEndPath,
  clearParentStates,
  triggerParentUpdate,
  modalHeading,
}) => {
  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const resetComponent = () => {
    handleCloseModal();
    clearParentStates();
    resetHookState();
    setSuccessMessage("");
  };

  const triggerDeleteRequest = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/${urlEndPath}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";

      setSuccessMessage(returnedData.message);
      setIsDeleting(false);
      triggerParentUpdate();
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
    triggerDeleteRequest();
  }, [triggerDeleteRequest, requestStatus, isDeleting]);

  const isDisabled = requestStatus === "loading" ? true : false;

  return (
    <ModalTemplate
      modalHeading={modalHeading}
      modalState={modalVisibilityState}
      handleCloseModal={resetComponent}
    >
      {!successMessage && <h2>Are you sure you want to delete?</h2>}
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
            variant="secondary"
            type="button"
            disabled={isDisabled}
            onClick={resetComponent}
          >
            Cancel
          </Button>
          <Button
            disabled={isDisabled}
            variant="danger"
            type="button"
            onClick={() => setIsDeleting(true)}
          >
            {!isDisabled && "Delete"}
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
export default DeleteController;
