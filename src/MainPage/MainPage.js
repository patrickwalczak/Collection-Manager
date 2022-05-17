import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MainPage = () => {
  return (
    <Container
      style={{ minHeight: "60vh" }}
      className="d-flex align-items-center flex-column rounded bg-white col-10 col-sm-7 col-md-11 col-lg-9 col-xl-8 col-xll-7 mx-auto pb-3 mt-4 p-4"
    >
      <Row className="mb-5 rounded col-12 ">
        <Col className="rounded p-2 p-md-3 p-xl-2 text-center text-white bg-dark">
          <h1>Item name</h1>
          <div className="d-flex">
            <span>Tags</span>
          </div>
        </Col>
      </Row>
      <Row className="mb-5 rounded col-12 ">
        <Col className="rounded p-2 p-md-3 p-xl-2 text-center text-white bg-dark">
          <h1>Item name</h1>
          <div className="d-flex">
            <span>Tags</span>
          </div>
        </Col>
      </Row>
      <Row className="mb-5 rounded col-12 ">
        <Col className="rounded p-2 p-md-3 p-xl-2 text-center text-white bg-dark">
          <h1>Item name</h1>
          <div className="d-flex">
            <span>Tags</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default MainPage;
