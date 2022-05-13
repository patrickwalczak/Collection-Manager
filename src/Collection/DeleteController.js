import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import ModalTemplate from "../UI/ModalTemplate";
import useHttp from "../hooks/useHttp";
import { useCallback, useEffect, useState } from "react";

const DeleteController = ({
  modalVisibilityState,
  handleCloseModal,
  token,
  itemID,
}) => {
  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const resetComponent = () => {
    resetHookState();
    setSuccessMessage("");
    handleCloseModal();
  };

  const deleteItem = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/${itemID}/deleteItem`,
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
    } catch (err) {
      setIsDeleting(false);
    }
  }, []);

  useEffect(() => {
    if (!isDeleting || !!requestStatus) return;
    deleteItem();
  }, [deleteItem, requestStatus, isDeleting]);

  const isDisabled = requestStatus === "loading" ? true : false;

  return (
    <ModalTemplate
      modalHeading="Delete Item"
      modalState={modalVisibilityState}
      handleCloseModal={resetComponent}
    >
      {!successMessage && <h2>Are you sure you want to delete?</h2>}
      {requestError !== null && requestStatus !== "loading" && (
        <Alert variant="danger">
          <Alert.Heading>{requestError}</Alert.Heading>
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="outline-danger" onClick={resetHookState}>
              Try again
            </Button>
          </div>
        </Alert>
      )}
      {!successMessage && (
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
export default DeleteController;
