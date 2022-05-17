import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddCommentController from "./AddCommentController";
import CommentList from "./CommentList";

const Comments = ({ comments }) => {
  return (
    <Row className="mb-5 rounded col-12">
      <Col className="rounded p-2 p-md-3 p-xl-2 text-white bg-dark">
        <AddCommentController />
        <CommentList comments={comments} />
      </Col>
    </Row>
  );
};
export default Comments;
