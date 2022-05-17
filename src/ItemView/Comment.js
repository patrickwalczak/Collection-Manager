import "bootstrap/dist/css/bootstrap.min.css";

const Comment = ({ author, comment }) => {
  return (
    <div className="col-11">
      <hr></hr>
      <h5>{author}</h5>
      <p className="text-break">{comment}</p>
      <hr></hr>
    </div>
  );
};
export default Comment;
