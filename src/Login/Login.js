import SignInForm from "./SignInForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";

const Login = () => {
  return (
    <Col
      className="card shadow rounded p-3  p-lg-3 p-xl-4 mb-3"
      xs={12}
      sm={7}
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
