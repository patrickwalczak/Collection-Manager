import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";

const FormWrapper = (props) => {
  return (
    <Col className="card shadow rounded p-2 p-md-3 p-lg-3 p-xl-4 position-absolute top-50 start-50 translate-middle col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
      {props.children}
    </Col>
  );
};
export default FormWrapper;
