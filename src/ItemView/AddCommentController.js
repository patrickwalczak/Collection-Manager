import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import { useEffect, useState, useCallback, Fragment, useContext } from "react";

import useHttp from "../hooks/useHttp";

import AddCommentForm from "./AddCommentForm";

import AppContext from "../store/app-context";

import { useParams } from "react-router-dom";

import { socket } from "../socket/socket";

const AddCommentController = () => {
  const [submittedFormData, setFormData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [addCommentFormVisibility, setAddCommentFormVisibility] =
    useState(false);

  const { username, token } = useContext(AppContext);

  const { itemId } = useParams();

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const resetComponent = () => {
    setAddCommentFormVisibility(!addCommentFormVisibility);
    setFormData(null);
    resetHookState();
    setSuccessMessage("");
  };

  const addComment = useCallback(async (formData) => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/items/${itemId}/addComment`,
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

      socket.emit("send_message", {
        ...formData,
        author: username,
      });
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!submittedFormData || !!requestStatus) return;
    addComment(submittedFormData);
  }, [submittedFormData, addComment, requestStatus]);

  return (
    <Fragment>
      <Button onClick={resetComponent} aria-expanded={addCommentFormVisibility}>
        Add Comment
      </Button>
      <Collapse in={addCommentFormVisibility}>
        <div>
          {!successMessage && (
            <AddCommentForm
              requestError={requestError}
              requestStatus={requestStatus}
              resetHookState={resetHookState}
              setFormData={setFormData}
              handleCloseModal={resetComponent}
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
        </div>
      </Collapse>
    </Fragment>
  );
};
export default AddCommentController;
