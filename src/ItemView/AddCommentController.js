import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import AddCommentForm from "./AddCommentForm";
import SuccessAlert from "../UI/SuccessAlert";

import {
  useEffect,
  useState,
  useCallback,
  Fragment,
  useContext,
  useRef,
} from "react";

import useHttp from "../hooks/useHttp";

import AppContext from "../store/app-context";

import { useParams } from "react-router-dom";

import { socket } from "../socket/socket";

const AddCommentController = () => {
  const [submittedFormData, setFormData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [addCommentFormVisibility, setAddCommentFormVisibility] =
    useState(false);

  const commentInputRef = useRef();

  const { username, token, userId, theme } = useContext(AppContext);

  const { itemId } = useParams();

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const resetComponent = () => {
    if (!successMessage) commentInputRef.current.value = "";
    setAddCommentFormVisibility(!addCommentFormVisibility);
    setFormData(null);
    resetHookState();
    setSuccessMessage("");
  };

  const addComment = useCallback(async (formData) => {
    try {
      const comment = { ...formData, author: username };
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/addComment`,
        {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";
      setSuccessMessage(returnedData.message);
      socket.emit("new_comment", { comment });
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!submittedFormData || !!requestStatus) return;
    addComment(submittedFormData);
  }, [submittedFormData, addComment, requestStatus]);

  useEffect(() => {
    if (!requestError) return;
    setTimeout(() => {
      setFormData(null);
      resetHookState();
    }, [2000]);
  }, [requestError]);

  return (
    <Fragment>
      {!!token && !!userId && (
        <Button
          variant="dark"
          className="themeClass w-100 mb-2"
          onClick={resetComponent}
          aria-expanded={addCommentFormVisibility}
        >
          Add Comment
        </Button>
      )}

      <Collapse className="px-0" in={addCommentFormVisibility}>
        <div>
          {!successMessage && (
            <AddCommentForm
              {...{
                requestError,
                requestStatus,
                resetHookState,
                theme,
                setFormData,
                commentInputRef,
              }}
              handleCloseModal={resetComponent}
            />
          )}
        </div>
      </Collapse>
      {!!successMessage && (
        <SuccessAlert
          successMessage={successMessage}
          onCloseModal={resetComponent}
        />
      )}
      {!!requestError && (
        <Alert variant="danger">
          <p>{requestError}</p>
        </Alert>
      )}
    </Fragment>
  );
};
export default AddCommentController;
