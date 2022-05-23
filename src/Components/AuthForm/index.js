import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import ReusableFormField from "../../common/UI/ReusableFormField";

import { Formik } from "formik";
import * as yup from "yup";

import { Link } from "react-router-dom";

import { validationTemplates } from "../../shared/helpers/yupHelper";

import { FormattedMessage } from "react-intl";

const AuthenticationForm = ({
  theme,
  setFormData,
  requestStatus,
  requestError,
  resetHookState,
  initialValues,
  signUpForm,
}) => {
  const { validateSingleTextField, validatePassword, validateEmail } =
    validationTemplates;

  const validationSchema = { email: validateEmail, password: validatePassword };

  if (!!signUpForm) validationSchema.username = validateSingleTextField;

  const isDisabled = requestStatus === "loading" ? true : false;

  const submitButtonText = !!signUpForm ? "signup" : "login";

  const pathToPage = !!signUpForm ? "login" : "signup";

  const schema = yup.object().shape(validationSchema);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={setFormData}
      initialValues={initialValues}
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
        <Form className="themeClass" noValidate onSubmit={handleSubmit}>
          {!!signUpForm && (
            <ReusableFormField
              name="username"
              label={<FormattedMessage id="form.username" />}
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
          )}
          <ReusableFormField
            autoFocus={!signUpForm}
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

          <ReusableFormField
            label={<FormattedMessage id="form.password" />}
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
              {requestError}
            </Alert>
          )}
          <div className="d-grid gap-1 mt-4 mb-2">
            <Button
              disabled={isDisabled}
              type="submit"
              className="btn-light themeClass"
            >
              {!isDisabled && (
                <FormattedMessage
                  id={`app-navigation.${submitButtonText}.button`}
                />
              )}
              {isDisabled && <Spinner animation="border" />}
            </Button>
          </div>
          <Link
            to={`/${pathToPage}`}
            className={`btn btn-inherit ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            <FormattedMessage id={`app-navigation.${pathToPage}.button`} />{" "}
            <FormattedMessage id="instead" />
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default AuthenticationForm;
