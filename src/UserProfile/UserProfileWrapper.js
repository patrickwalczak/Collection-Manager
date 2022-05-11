import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

const UserProfileWrapper = (props) => {
  return (
    <Container
      style={{ minHeight: "60vh" }}
      className="rounded bg-white col-10 col-sm-7 col-md-11 col-lg-9 col-xl-8 col-xll-7 mx-auto pb-3 mt-4"
    >
      {props.children}
    </Container>
  );
};
export default UserProfileWrapper;
