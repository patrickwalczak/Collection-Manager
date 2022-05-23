import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import ModalTemplate from "./ModalTemplate";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

import { FormattedMessage } from "react-intl";

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
      {!successMessage && (
        <h2>
          <FormattedMessage id="delete.confirm" />
        </h2>
      )}
      {requestError !== null && requestStatus !== "loading" && (
        <ErrorAlert {...{ requestError, retryRequest: triggerRequestAgain }} />
      )}
      {!successMessage && !requestError && (
        <div className="d-flex justify-content-end gap-3">
          <Button
            variant="secondary"
            type="button"
            disabled={isDisabled}
            onClick={resetComponent}
          >
            <FormattedMessage id="cancel" />
          </Button>
          <Button
            disabled={isDisabled}
            variant="danger"
            type="button"
            onClick={() => setIsDeleting(true)}
          >
            {!isDisabled && <FormattedMessage id="delete" />}
            {isDisabled && <Spinner animation="border" />}
          </Button>
        </div>
      )}
      {!!successMessage && (
        <SuccessAlert {...{ successMessage, onCloseModal: resetComponent }} />
      )}
    </ModalTemplate>
  );
};
export default DeleteController;
