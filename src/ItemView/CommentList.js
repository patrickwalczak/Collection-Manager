import Comment from "./Comment";

const CommentList = ({ comments }) => {
  let content;

  if (!comments?.length) {
    content = (
      <div className="rounded themeClass p-4 shadow">
        <h5 className="fw-normal text-center">NO COMMENTS</h5>
      </div>
    );
  }

  if (comments?.length) {
    content = comments.map((comment, index) => (
      <Comment key={index} {...comment} />
    ));
  }

  return <div className="mt-4 px-0">{content}</div>;
};
export default CommentList;
