import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.mixed().required(),
});

function SignUp() {
  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitHandler}
      initialValues={{
        username: "",
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
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.username && touched.username}
              isValid={!errors.username && values.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.email && touched.email}
              isValid={!errors.email && values.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.password && touched.password}
              isValid={!errors.password && values.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            <br></br>
          </Form.Group>
          {false && (
            <Alert variant="danger" onClose={() => {}} dismissible>
              <Alert.Heading>Error</Alert.Heading>
              <p></p>
            </Alert>
          )}
          <div className="d-grid gap-1">
            <Button type="submit" variant="dark" size="lg">
              SIGN UP
            </Button>
            <Link to={"/login"}>
              <Button variant="link">Log in instead</Button>
            </Link>
          </div>
          {false && <Spinner animation="border" />}
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
