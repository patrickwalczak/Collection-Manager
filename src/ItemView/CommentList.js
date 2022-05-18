import Comment from "./Comment";

const CommentList = ({ comments }) => {
  let content;
  if (!comments.length) {
    content = <p>NO COMMENTS</p>;
  }

  if (comments.length) {
    content = comments.map((comment, index) => (
      <Comment key={index} {...comment} />
    ));
  }

  return <div>{content}</div>;
};
export default CommentList;
