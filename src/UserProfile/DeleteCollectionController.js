import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import ModalTemplate from "../UI/ModalTemplate";
import useHttp from "../hooks/useHttp";
import { useCallback, useEffect, useState } from "react";

const DeleteCollectionController = ({
  modalVisibilityState,
  handleCloseModal,
  token,
  collectionID,
  clearCollectionStates,
  triggerUpdate,
}) => {
  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const resetComponent = () => {
    handleCloseModal();
    clearCollectionStates();
    resetHookState();
    setSuccessMessage("");
  };

  const deleteCollection = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/collections/${collectionID}/deleteCollection`,
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
    deleteCollection();
  }, [deleteCollection, requestStatus, isDeleting]);

  const isDisabled = requestStatus === "loading" ? true : false;

  return (
    <ModalTemplate
      modalHeading="Delete Collection"
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
export default DeleteCollectionController;
