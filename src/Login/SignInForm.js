import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { Formik } from "formik";
import * as yup from "yup";

import useHttp from "../hooks/useHttp";
import AppContext from "../store/app-context";

import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

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
  const {
    error,
    status,
    data: loggedInUser,
    sendRequest,
    clearError,
  } = useHttp();
  const [formData, setFormData] = useState(null);

  const { login } = useContext(AppContext);

  useEffect(() => {
    if (!formData) return;
    sendRequest("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFormData(null);
  }, [formData, sendRequest]);

  useEffect(() => {
    if (!loggedInUser) return;
    login(loggedInUser);
    clearError();
  }, [loggedInUser, login, clearError]);

  const isDisabled = status === "loading" ? true : false;

  return (
    <Formik
      validationSchema={schema}
      onSubmit={setFormData}
      initialValues={{
        email: "",
        password: "",
      }}
    >
      {({
        handleSubmit,
        handleBlur,
        setFieldTouched,
        setFieldValue,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <ReusableFieldName
            label="Email"
            name="email"
            type="email"
            value={values.email}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
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
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
            isInvalid={errors.password && touched.password}
            isValid={!errors.password && values.password}
            error={errors.password}
          />
          {error !== null && status !== "loading" && (
            <Alert variant="danger" onClose={clearError} dismissible>
              <Alert.Heading>{error}</Alert.Heading>
            </Alert>
          )}
          <div className="d-grid gap-1 mt-4">
            <Button disabled={isDisabled} type="submit" variant="dark">
              {!isDisabled && "SIGN UP"}
              {isDisabled && <Spinner animation="border" />}
            </Button>
            <Link to={"/signup"}>
              <Button variant="link">Create an account instead</Button>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
