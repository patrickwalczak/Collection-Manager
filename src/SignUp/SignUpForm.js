import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import ReusableFieldName from "./ReusableFieldName";

const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3)
    .max(20)
    .required("Field is required!")
    .matches(/^[A-Za-z0-9]+$/, "Username cannot contain special characters"),
  email: yup.string().email().required("Field is required!"),
  password: yup
    .string()
    .min(2, "Too short")
    .max(15, "Too long")
    .required("Field is required!"),
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
        handleBlur,
        setFieldValue,
        setFieldTouched,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <ReusableFieldName
            name="username"
            label="Username"
            type="text"
            value={values.username}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            onBlur={handleBlur}
            isInvalid={errors.username && touched.username}
            isValid={!errors.username && values.username}
            error={errors.username}
          />
          <ReusableFieldName
            label="Email"
            name="email"
            type="email"
            value={values.email}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            onBlur={handleBlur}
            isInvalid={errors.email && touched.email}
            isValid={!errors.email && values.email}
            error={errors.email}
          />

          <ReusableFieldName
            label="Password"
            name="password"
            type="password"
            value={values.password}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            onBlur={handleBlur}
            isInvalid={errors.password && touched.password}
            isValid={!errors.password && values.password}
            error={errors.password}
          />

          {false && (
            <Alert variant="danger" onClose={() => {}} dismissible>
              <Alert.Heading>Error</Alert.Heading>
              <p></p>
            </Alert>
          )}
          <div className="d-grid gap-1 mt-4">
            <Button type="submit" variant="dark">
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
