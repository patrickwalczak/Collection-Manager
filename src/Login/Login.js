import SignInForm from "./SignInForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Login = () => {
  return (
    <Col
      className="card shadow rounded p-3 p-lg-3 p-xl-4 mb-3 position-absolute top-50 start-50 translate-middle"
      xs={8}
      sm={6}
      md={5}
      lg={4}
      xl={3}
      xxl={3}
    >
      <h2 className="mb-3 text-center fs-1">SIGN IN</h2>
      <SignInForm />
    </Col>
  );
};

export default Login;
