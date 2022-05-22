import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";

const MainPageWrapper = (props) => {
  return (
    <Container
      fluid
      className="d-flex align-items-center flex-column col-12 col-lg-11 col-xl-9 col-xll-6 mt-4 p-0 p-md-2 p-lg-4 "
    >
      {props.children}
    </Container>
  );
};
export default MainPageWrapper;
