import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";

const Comment = ({ author, comment }) => {
  return (
    <div className="commentBg col-12 p-2 mb-2">
      <h5 className="fw-normal">{author}</h5>
      <p className="text-break">{comment}</p>
    </div>
  );
};
export default Comment;
