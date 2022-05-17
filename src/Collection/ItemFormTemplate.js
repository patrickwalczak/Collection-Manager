import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { Formik } from "formik";
import * as yup from "yup";

import ReusableFieldName from "../SignUp/ReusableFieldName";
import SelectTags from "../NewCollection/SelectTags";

import { useEffect } from "react";

import { validationTemplates } from "../helpers/yupHelper";

const ItemFormTemplate = ({
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
  customItemSchema,
  itemData,
  actionButtonText,
}) => {
  const {
    validateSingleTextField,
    validateMultilineTextField,
    validateDateField,
    validateNumberField,
  } = validationTemplates;

  const validationSchema = {
    name: validateSingleTextField,
    tags: yup.array().test({
      message: "Tags are required!",
      test: (tags) => tags.length !== 0,
    }),
  };

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

  const initialFormValues = !!itemData ? itemData : { name: "", tags: [] };

  const initiateFormValues = () => {
    for (const names in customItemSchema) {
      const fieldsNames = customItemSchema[names];
      if (!fieldsNames.length) continue;
      fieldsNames.forEach((fieldName) => (initialFormValues[fieldName] = ""));
    }
  };

  const submitButtonText = !!actionButtonText ? actionButtonText : "SUBMIT";

  useEffect(() => {
    if (!!itemData) return;
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
        values,
        touched,
        errors,
        setFieldValue,
        setFieldTouched,
        setFieldError,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="pb-4">
          <ReusableFieldName
            autoFocus
            name="name"
            label="Item Name*"
            type="text"
            value={values.name}
            isInvalid={errors.name && touched.name}
            isValid={!errors.name && values.name}
            error={errors.name}
            disabled={isDisabled}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
          />

          <SelectTags
            name="tags"
            setValue={setFieldValue}
            setError={setFieldError}
            onBlur={handleBlur}
            setTouched={setFieldTouched}
            value={values.tags}
            error={errors.tags}
            isTouched={touched.tags}
          />

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
              defaultValue={values[fieldName]}
            />
          ))}

          {multilineTextFields.map((fieldName, index) => (
            <ReusableFieldName
              key={fieldName + index}
              name={fieldName}
              label={fieldName}
              as="textarea"
              style={{ minHeight: "100px" }}
              isInvalid={errors[fieldName] && touched[fieldName]}
              isValid={!errors[fieldName] && values[fieldName]}
              error={errors[fieldName]}
              disabled={isDisabled}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              defaultValue={values[fieldName]}
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
              defaultValue={values[fieldName]}
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
              defaultValue={values[fieldName]}
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
                defaultValue={values[fieldName]}
              />
            </Form.Group>
          ))}

          {requestError !== null && requestStatus !== "loading" && (
            <Alert variant="danger">
              <Alert.Heading>{requestError}</Alert.Heading>
              <div className="mt-3 d-flex justify-content-end">
                <Button variant="outline-danger" onClick={resetHookState}>
                  Try again
                </Button>
              </div>
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
              {!isDisabled && submitButtonText}
              {isDisabled && <Spinner animation="border" />}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ItemFormTemplate;
