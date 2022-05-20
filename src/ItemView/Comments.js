import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AddCommentController from "./AddCommentController";
import CommentList from "./CommentList";

import { useState, useEffect } from "react";

import { socket } from "../socket/socket";

const Comments = ({ itemComments }) => {
  const [comments, setComments] = useState(itemComments);

  useEffect(() => {
    socket.on("receive_comment", (data) => setComments([...comments, data]));
  }, [socket]);

  return (
    <Row className="mb-5 rounded col-12 mt-4">
      <h3 className="text-white fs-2 mb-3">Comments</h3>
      <Col className="text-white">
        <AddCommentController />
        <CommentList comments={comments} />
      </Col>
    </Row>
  );
};
export default Comments;
