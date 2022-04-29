import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.mixed().required(),
});

function SignInForm() {
  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitHandler}
      initialValues={{
        email: "",
        password: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@example.com"
              name="email"
              value={values.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {false && (
            <Alert variant="danger" onClose={() => {}} dismissible>
              <Alert.Heading>Error</Alert.Heading>
              <p></p>
            </Alert>
          )}

          <div className="d-grid gap-1">
            <Button type="submit" variant="dark" size="lg">
              SIGN IN
            </Button>
            <Link to={"/signup"}>
              <Button variant="link">Create an account instead</Button>
            </Link>
          </div>

          {false && <Spinner animation="border" />}
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
