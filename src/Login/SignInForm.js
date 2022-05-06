import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import ReusableFieldName from "../SignUp/ReusableFieldName";

const schema = yup.object().shape({
  email: yup.string().trim().email().required("Field is required!"),
  password: yup
    .string()
    .trim()
    .min(2, "Too short!")
    .max(15, "Too long")
    .required("Field is required!"),
});

function SignInForm() {
  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
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

          <div className="d-grid gap-2 ">
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
