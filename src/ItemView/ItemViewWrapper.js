import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

const ItemViewWrapper = (props) => {
  return (
    <Container
      style={{ minWidth: "400px" }}
      fluid
      className="overflow-visible d-flex align-items-center flex-column col-11 col-lg-9 col-xl-8 col-xll-7 mx-auto pb-3 mt-4 p-4"
    >
      {props.children}
    </Container>
  );
};
export default ItemViewWrapper;
