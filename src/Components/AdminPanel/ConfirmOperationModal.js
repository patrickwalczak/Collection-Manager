import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import ModalTemplate from "../../common/UI/ModalTemplate";
import ErrorAlert from "../../common/UI/ErrorAlert";
import SuccessAlert from "../../common/UI/ErrorAlert";

import { FormattedMessage } from "react-intl";

import { useCallback, useEffect, useState, useContext } from "react";

import useHttp from "../../shared/hooks/useHttp";

import AppContext from "../../shared/context/app-context";

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

      <FormattedMessage id="try.again" />;

      if (requestBodyObject?.status === "blocked" && !!findLoggedUser)
        handleLogOutAdmin(<FormattedMessage id="admin.blocked.account" />);

      if (requestBodyObject?.userType === "user" && !!findLoggedUser)
        handleLogOutAdmin(<FormattedMessage id="admin.removed.admin" />);
      if (method === "DELETE" && !!findLoggedUser)
        handleLogOutAdmin(<FormattedMessage id="admin.deleted.account" />);

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
      modalHeading={<FormattedMessage id="admin.confirm.operation" />}
      modalState={modalVisibilityState}
      handleCloseModal={resetComponent}
    >
      {!successMessage && <h2>{modalQuestion}</h2>}
      {requestError !== null && requestStatus !== "loading" && (
        <ErrorAlert {...{ requestError, retryRequest: triggerRequestAgain }} />
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
            <FormattedMessage id="cancel" />
          </Button>
          <Button
            disabled={isDisabled}
            className="col-4"
            variant="danger"
            type="button"
            onClick={() => setIsDeleting(true)}
          >
            {!isDisabled && <FormattedMessage id="confirm" />}
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
export default ConfirmOperationModal;
