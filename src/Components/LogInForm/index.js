import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { Formik } from "formik";
import * as yup from "yup";

import { Link } from "react-router-dom";

import ReusableFieldName from "../ReusableFieldName";

import { validationTemplates } from "../../helpers/yupHelper";

function LogInForm({
  theme,
  setFormData,
  requestStatus,
  requestError,
  resetHookState,
}) {
  const { validatePassword, validateEmail } = validationTemplates;

  const schema = yup.object().shape({
    email: validateEmail,
    password: validatePassword,
  });

  const isDisabled = requestStatus === "loading" ? true : false;

  const themeClass = theme === "light" ? "dark" : "light";

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
        <Form noValidate onSubmit={handleSubmit} className="themeClass">
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
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
          {!!requestError && requestStatus !== "loading" && (
            <Alert variant="danger" onClose={resetHookState} dismissible>
              <Alert.Heading>{requestError}</Alert.Heading>
            </Alert>
          )}
          <div className="d-grid gap-1 mt-4 mb-2">
            <Button disabled={isDisabled} type="submit" variant={themeClass}>
              {!isDisabled && "SIGN IN"}
              {isDisabled && <Spinner animation="border" />}
            </Button>
          </div>
          <Link className="btn btn-link" to={"/signup"}>
            Create an account instead
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default LogInForm;
