import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

const UserProfileWrapper = (props) => {
  return (
    <Container
      style={{ minHeight: "60vh", maxWidth: "1000px", minWidth: "300px" }}
      fluid
      className="position-relative col-10 col-sm-9 col-md-11 col-lg-9 col-xl-8 col-xll-7 mx-auto pb-3 mt-4"
    >
      {props.children}
    </Container>
  );
};
export default UserProfileWrapper;
