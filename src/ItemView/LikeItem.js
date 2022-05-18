import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useEffect, useState, useCallback, Fragment, useContext } from "react";
import useHttp from "../hooks/useHttp";

const LikeItem = ({ token, itemId, isLikedByLoggedUser }) => {
  const [isSending, setSending] = useState(false);
  const [isLiked, setLiked] = useState(isLikedByLoggedUser);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const handleLike = useCallback(async (action, changeLikedState) => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/items/${itemId}/${action}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";
      setSending(false);
      setLiked(changeLikedState);
    } catch (err) {
      setSending(false);
    }
  }, []);

  useEffect(() => {
    if (!isSending) return;
    if (!isLiked) {
      handleLike("likeItem", true);
    } else {
      handleLike("removeLike", false);
    }
    setSending(false);
  }, [isSending, handleLike, isLiked]);

  const btnClass = isLiked ? "primary" : "outline-primary";
  return (
    <div className="col-12 d-grid justify-content-start align-items-start">
      <Button onClick={() => setSending(true)} variant={btnClass}>
        {requestStatus !== "loading" && "LIKE"}
        {requestStatus === "loading" && <Spinner animation="border" />}
      </Button>
    </div>
  );
};
export default LikeItem;
