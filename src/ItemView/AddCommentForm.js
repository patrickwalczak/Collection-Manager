import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { Formik } from "formik";
import * as yup from "yup";

import ReusableFieldName from "../SignUp/ReusableFieldName";

import { validationTemplates } from "../helpers/yupHelper";

const AddCommentForm = ({
  requestError,
  requestStatus,
  resetHookState,
  setFormData,
  handleCloseModal,
}) => {
  const initialFormValues = {
    comment: "",
  };

  const { validateMultilineTextField } = validationTemplates;

  const schema = yup.object().shape({
    comment: validateMultilineTextField,
  });

  const isDisabled = requestStatus === "loading" ? true : false;

  return (
    <Formik
      validationSchema={schema}
      onSubmit={setFormData}
      initialValues={initialFormValues}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        handleReset,
        values,
        touched,
        isValid,
        errors,
        setFieldValue,
        setFieldError,
        setFieldTouched,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="pb-4">
          <ReusableFieldName
            name="comment"
            label=""
            as="textarea"
            placeholder="Leave comment..."
            style={{ minHeight: "100px" }}
            value={values.comment}
            isInvalid={errors.comment && touched.comment}
            isValid={!errors.comment && values.comment}
            error={errors.comment}
            disabled={isDisabled}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
          />

          {requestError !== null && requestStatus !== "loading" && (
            <Alert variant="danger" onClose={resetHookState} dismissible>
              <Alert.Heading>{requestError}</Alert.Heading>
            </Alert>
          )}

          <div className="d-flex justify-content-end gap-2">
            <Button
              className="col-2"
              variant="secondary"
              type="button"
              disabled={isDisabled}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              disabled={isDisabled}
              className="col-2"
              variant="success"
              type="submit"
            >
              {!isDisabled && "SAVE"}
              {isDisabled && <Spinner animation="border" />}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCommentForm;
