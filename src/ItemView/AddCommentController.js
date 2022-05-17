import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { useEffect, useState, useCallback, Fragment, useContext } from "react";

import useHttp from "../hooks/useHttp";

import AddCommentForm from "./AddCommentForm";

import AppContext from "../store/app-context";

import { useParams, Link } from "react-router-dom";

const AddCommentController = ({
  heading,
  modalVisibilityState,
  handleCloseModal,
  customItemSchema,
  url,
  clearItemStates,
  triggerUpdate,
}) => {
  const [submittedFormData, setFormData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const { username, token } = useContext(AppContext);

  const { itemId } = useParams();

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const resetComponent = () => {
    // handleCloseModal();
    // setFormData(null);
    // clearItemStates();
    // resetHookState();
    // setSuccessMessage("");
  };

  const addComment = useCallback(async (formData) => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/${itemId}/addComment`,
        {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            author: username,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";

      setSuccessMessage(returnedData.message);
      //   triggerUpdate();
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!submittedFormData || !!requestStatus) return;
    addComment(submittedFormData);
  }, [submittedFormData, addComment, requestStatus]);

  return (
    <Fragment>
      {!successMessage && (
        <AddCommentForm
          requestError={requestError}
          requestStatus={requestStatus}
          resetHookState={resetHookState}
          setFormData={setFormData}
          handleCloseModal={handleCloseModal}
        />
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
    </Fragment>
  );
};
export default AddCommentController;
