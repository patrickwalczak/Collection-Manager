import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { Formik } from "formik";
import * as yup from "yup";

import CollectionTopic from "../NewCollection/CollectionTopic";
import SelectTags from "../NewCollection/SelectTags";
import ReusableFieldName from "../SignUp/ReusableFieldName";

const EditCollectionForm = ({
  requestError,
  requestStatus,
  resetHookState,
  setFormData,
  handleCloseModal,
  initialValues,
}) => {
  const initialFormValues = initialValues || {
    collectionName: "",
    collectionTopic: "",
    collectionDescription: "",
    collectionTags: [],
  };

  const checkQuestionErrorMessage = "You have to choose one option";
  const isRequiredErrorMessage = "Field is required!";
  const tooLongErrorMessage = "Input is too long!";
  const tooShortErrorMessage = "Input is too short!";

  const regexForSpecialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  const customFieldsNamesTest = {
    message: "Custom fields names cannot be empty!",
    test: (fieldsNames) =>
      fieldsNames.every((fieldName) => fieldName !== undefined),
  };

  const schema = yup.object().shape({
    collectionName: yup
      .string()
      .trim()
      .min(3, tooShortErrorMessage)
      .max(25, tooLongErrorMessage)
      .required(isRequiredErrorMessage),
    collectionTopic: yup.string().required(isRequiredErrorMessage),
    collectionTags: yup.array().test({
      message: isRequiredErrorMessage,
      test: (tags) => tags.length !== 0,
    }),
    collectionDescription: yup
      .string()
      .trim()
      .min(1, tooShortErrorMessage)
      .max(300, tooLongErrorMessage)
      .required(isRequiredErrorMessage),
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
            autoFocus
            name="collectionName"
            label="Collection Name*"
            type="text"
            value={values.collectionName}
            isInvalid={errors.collectionName && touched.collectionName}
            isValid={!errors.collectionName && values.collectionName}
            error={errors.collectionName}
            disabled={isDisabled}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
          />

          <CollectionTopic
            name="collectionTopic"
            error={errors.collectionTopic}
            isTouched={touched.collectionTopic}
            setValue={setFieldValue}
            setError={setFieldError}
            setTouched={setFieldTouched}
            value={values.collectionTopic}
          />

          <ReusableFieldName
            name="collectionDescription"
            label="Collection Description*"
            as="textarea"
            placeholder="My collection is about..."
            style={{ height: "100px" }}
            value={values.collectionDescription}
            isInvalid={
              errors.collectionDescription && touched.collectionDescription
            }
            isValid={
              !errors.collectionDescription && values.collectionDescription
            }
            error={errors.collectionDescription}
            disabled={isDisabled}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
          />

          <SelectTags
            name="collectionTags"
            setValue={setFieldValue}
            setError={setFieldError}
            onBlur={handleBlur}
            setTouched={setFieldTouched}
            value={values.collectionTags}
            error={errors.collectionTags}
            isTouched={touched.collectionTags}
          />

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
              {!isDisabled && "SAVE"}
              {isDisabled && <Spinner animation="border" />}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditCollectionForm;
