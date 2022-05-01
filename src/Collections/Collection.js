import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";

const Collection = () => {
  return (
    <Row className="col-12 col-md-5 col-xl-12 flex-xl-row text-white mx-0">
      <Col
        className="rounded col-12 col-xl-8 p-3 p-xl-4 order-2 order-xl-1"
        style={{ minHeight: "12rem", backgroundColor: "#00203FFF" }}
      >
        <h3>Collection Title</h3>
        <span className="d-flex mb-2">Collection topic</span>
        <div className="col-8 mb-2 d-flex gap-2 flex-wrap">
          <Badge bg="secondary" className="text-uppercase">
            New
          </Badge>
          <Badge bg="secondary" className="text-uppercase">
            New
          </Badge>
          <Badge bg="secondary" className="text-uppercase">
            New
          </Badge>
          <Badge bg="secondary" className="text-uppercase">
            New
          </Badge>
        </div>
        <p className="col-11">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          fugiat asperiores inventore beatae accusamus odit minima enim, commodi
          quia, doloribus eius! Ducimus nemo accusantium maiores velit
        </p>
        <div className="col-12 d-flex p-2 gap-3 flex-wrap">
          <Button variant="success">OPEN</Button>
          <Button className="text-white" variant="warning">
            EDIT
          </Button>
          <Button variant="danger">DELETE</Button>
        </div>
      </Col>
      <Col
        className="rounded col-12 col-xl-4 order-1 order-xl-2 pr-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1649771174243-ca0b50ea6647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "12rem",
        }}
      ></Col>
    </Row>
  );
};

export default Collection;
