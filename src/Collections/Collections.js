import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Collection from "./Collection";

const Collections = () => {
  const uid = useParams().uid;

  return (
    <Container className="col-10 col-sm-7 col-md-11 col-lg-9 col-xl-8 col-xll-7 card mx-auto px-2 px-xl-3 px-xll-4">
      <Row>
        <Col className="p-2 p-md-3 p-xl-4 text-center">
          <h1>Collections</h1>
        </Col>
      </Row>
      <Col className="d-flex flex-xl-column flex-wrap gap-4 gap-md-0 gap-xl-3 justify-content-around mb-5">
        <Collection></Collection>
        <Collection></Collection>
      </Col>
    </Container>
  );
};

export default Collections;
