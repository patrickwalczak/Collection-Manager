import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { Formik } from "formik";
import * as yup from "yup";

import ReusableFieldName from "../SignUp/ReusableFieldName";
import { useEffect } from "react";

import { validationTemplates } from "../helpers/yupHelper";

const AddItemForm = ({
  requestError,
  requestStatus,
  resetHookState,
  setFormData,
  handleCloseModal,
  textFields,
  numberFields,
  multilineTextFields,
  dateFields,
  booleanFields,
  customItemProperties,
}) => {
  const {
    validateSingleTextField,
    validateMultilineTextField,
    validateDateField,
    validateNumberField,
  } = validationTemplates;

  const initialFormValues = {};

  const initiateFormValues = () => {
    for (const names in customItemProperties) {
      const fieldsNames = customItemProperties[names];
      if (!fieldsNames.length) continue;
      fieldsNames.forEach((fieldName) => (initialFormValues[fieldName] = ""));
    }
  };

  const validationSchema = {};

  const addFieldsNamesToValidationSchema = () => {};

  textFields.forEach(
    (fieldName) => (validationSchema[fieldName] = validateSingleTextField)
  );

  multilineTextFields.forEach(
    (fieldName) => (validationSchema[fieldName] = validateMultilineTextField)
  );

  dateFields.forEach(
    (fieldName) => (validationSchema[fieldName] = validateDateField)
  );

  numberFields.forEach(
    (fieldName) => (validationSchema[fieldName] = validateNumberField)
  );

  useEffect(() => {
    initiateFormValues();
  }, []);

  const schema = yup.object().shape(validationSchema);

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
          {textFields.map((fieldName, index) => (
            <ReusableFieldName
              key={fieldName + index}
              name={fieldName}
              label={fieldName}
              type="text"
              isInvalid={errors[fieldName] && touched[fieldName]}
              isValid={!errors[fieldName] && values[fieldName]}
              error={errors[fieldName]}
              disabled={isDisabled}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
            />
          ))}

          {multilineTextFields.map((fieldName, index) => (
            <ReusableFieldName
              key={fieldName + index}
              name={fieldName}
              label={fieldName}
              as="textarea"
              style={{ height: "100px" }}
              isInvalid={errors[fieldName] && touched[fieldName]}
              isValid={!errors[fieldName] && values[fieldName]}
              error={errors[fieldName]}
              disabled={isDisabled}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
            />
          ))}

          {numberFields.map((fieldName, index) => (
            <ReusableFieldName
              key={fieldName + index}
              name={fieldName}
              label={fieldName}
              type="number"
              isInvalid={errors[fieldName] && touched[fieldName]}
              isValid={!errors[fieldName] && values[fieldName]}
              error={errors[fieldName]}
              disabled={isDisabled}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
            />
          ))}

          {dateFields.map((fieldName, index) => (
            <ReusableFieldName
              key={fieldName + index}
              name={fieldName}
              label={fieldName}
              type="date"
              isInvalid={errors[fieldName] && touched[fieldName]}
              isValid={!errors[fieldName] && values[fieldName]}
              error={errors[fieldName]}
              disabled={isDisabled}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
            />
          ))}

          {booleanFields.map((fieldName, index) => (
            <Form.Group className="mb-3" key={fieldName + index}>
              <Form.Check
                type="checkbox"
                name={fieldName}
                label={fieldName}
                key={fieldName + index}
                onChange={handleChange}
                id={fieldName}
                defaultValue={false}
              />
            </Form.Group>
          ))}

          {requestError !== null && requestStatus !== "loading" && (
            <Alert variant="danger" onClose={resetHookState} dismissible>
              <Alert.Heading>{requestError}</Alert.Heading>
            </Alert>
          )}

          <div className="d-flex justify-content-end gap-3">
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
              className="col-4"
              variant="success"
              type="submit"
            >
              {!isDisabled && "CREATE"}
              {isDisabled && <Spinner animation="border" />}
            </Button>
          </div>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify(touched, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default AddItemForm;
