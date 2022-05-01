import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required!")
    .min(4)
    .max(30)
    .test({
      message: "Incorrect email input",
      test: (email) => {
        if (!email) return;
        return (
          email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
          ) !== null
        );
      },
    }),
  password: yup
    .string()
    .trim()
    .min(2, "Password must have at least 2 characters")
    .max(15)
    .required("Password is required!"),
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
          <Form.Group className="mb-4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.email && touched.email}
              isValid={!errors.email && values.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.password && touched.password}
              isValid={values.password && !errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
          </Form.Group>
          {false && (
            <Alert variant="danger" onClose={() => {}} dismissible>
              <Alert.Heading>Error</Alert.Heading>
              <p></p>
            </Alert>
          )}

          <div className="d-grid gap-2">
            <Button type="submit" variant="dark">
              SIGN IN
            </Button>
            <Link to={"/signup"}>
              <Button variant="link">Sign up instead</Button>
            </Link>
          </div>

          {false && <Spinner animation="border" />}
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
