import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { AiFillLike } from "react-icons/ai";

import { useEffect, useState, useCallback, Fragment } from "react";

import useHttp from "../../hooks/useHttp";

const LikeItem = ({ token, itemId, isLikedByLoggedUser, theme }) => {
  const [isSending, setSending] = useState(false);
  const [itemIsLiked, setLikedItem] = useState(isLikedByLoggedUser);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const handleLike = useCallback(async (requestOperation, changeLikedState) => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/${requestOperation}`,
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
      setLikedItem(changeLikedState);
    } catch (err) {
      setSending(false);
    }
  }, []);

  useEffect(() => {
    if (!isSending) return;
    if (!itemIsLiked) {
      handleLike("likeItem", true);
    } else {
      handleLike("removeLike", false);
    }
    setSending(false);
  }, [isSending, handleLike, itemIsLiked]);

  useEffect(() => {
    if (!requestError) return;
    setTimeout(() => resetHookState(), 1000);
  });

  const btnClass = itemIsLiked
    ? theme === "dark"
      ? "light"
      : "dark"
    : theme === "dark"
    ? "outline-light"
    : "outline-dark";

  return (
    <Fragment>
      <div className="col-12 d-grid justify-content-start align-items-center mt-5">
        <Button
          className="fs-5 mb-3"
          onClick={() => setSending(true)}
          variant={btnClass}
        >
          {requestStatus !== "loading" && <AiFillLike />}
          {requestStatus === "loading" && <Spinner animation="border" />}
        </Button>
      </div>
      {!!requestError && <p className="text-danger">{requestError}</p>}
    </Fragment>
  );
};
export default LikeItem;
