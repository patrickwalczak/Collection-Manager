import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { Formik } from "formik";
import * as yup from "yup";

import { Link } from "react-router-dom";

import ReusableFieldName from "./ReusableFieldName";

import { validationTemplates } from "../helpers/yupHelper";

const SignUp = ({
  setFormData,
  requestStatus,
  requestError,
  resetHookState,
}) => {
  const { validateSingleTextField, validatePassword, validateEmail } =
    validationTemplates;

  const schema = yup.object().shape({
    username: validateSingleTextField,
    email: validateEmail,
    password: validatePassword,
  });

  const isDisabled = requestStatus === "loading" ? true : false;

  return (
    <Formik
      validationSchema={schema}
      onSubmit={setFormData}
      initialValues={{
        username: "",
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
            name="username"
            label="Username*"
            type="text"
            autoFocus
            value={values.username}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
            isInvalid={errors.username && touched.username}
            isValid={!errors.username && values.username}
            error={errors.username}
            disabled={isDisabled}
          />
          <ReusableFieldName
            label="Email*"
            name="email"
            type="email"
            value={values.email}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
            isInvalid={errors.email && touched.email}
            isValid={!errors.email && values.email}
            error={errors.email}
            disabled={isDisabled}
          />

          <ReusableFieldName
            label="Password*"
            name="password"
            type="password"
            value={values.password}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
            isInvalid={errors.password && touched.password}
            isValid={!errors.password && values.password}
            error={errors.password}
            disabled={isDisabled}
          />

          {!!requestError && requestStatus !== "loading" && (
            <Alert variant="danger" onClose={resetHookState} dismissible>
              <Alert.Heading>{requestError}</Alert.Heading>
            </Alert>
          )}
          <div className="d-grid gap-1 mt-4">
            <Button disabled={isDisabled} type="submit" variant="dark">
              {!isDisabled && "SIGN UP"}
              {isDisabled && <Spinner animation="border" />}
            </Button>
            <Link to={"/login"}>
              <Button variant="link">Log in instead</Button>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
