import "bootstrap/dist/css/bootstrap.min.css";

const Comment = ({ author, comment }) => {
  return (
    <div className="col-12">
      <hr></hr>
      <h5>{author}</h5>
      <p className="text-break">{comment}</p>
    </div>
  );
};
export default Comment;
