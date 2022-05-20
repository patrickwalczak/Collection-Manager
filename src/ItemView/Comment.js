import "bootstrap/dist/css/bootstrap.min.css";

const Comment = ({ author, comment }) => {
  return (
    <div className="commentBg rounded shadow px-4 pt-3 pb-2 mb-2">
      <h5 className="fw-normal fs-5 text-white">{author}</h5>
      <p className="text-break fs-5 text-secondary col-11">{comment}</p>
    </div>
  );
};
export default Comment;
