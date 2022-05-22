import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";

import AddCommentController from "./AddCommentController";
import CommentList from "./CommentList";

import { useState, useEffect } from "react";

import { socket } from "../socket/socket";

import { AiOutlineComment } from "react-icons/ai";

const Comments = ({ itemComments, theme, itemId }) => {
  const [comments, setComments] = useState([...itemComments]);

  useEffect(() => {
    socket.on("receive_comment", (data) => setComments([...comments, data]));
  }, [socket]);

  return (
    <Row data-theme={theme} className="mt-4 col-12 d-flex">
      <h3
        className={`text-${
          theme === "dark" ? "white" : "dark"
        } px-0 pb-4 fs-3 mb-3 fw-normal border-bottom`}
      >
        Comments <AiOutlineComment />
      </h3>

      <AddCommentController />
      {!!itemComments && <CommentList comments={comments} />}
    </Row>
  );
};
export default Comments;
