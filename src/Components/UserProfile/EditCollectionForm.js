import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { Formik } from "formik";
import * as yup from "yup";

import CollectionTopic from "../NewCollection/CollectionTopic";
import ErrorAlert from "../../UI/ErrorAlert";

import ReusableFormField from "../ReusableFormField";

import { validationTemplates } from "../../helpers/yupHelper";

const EditCollectionForm = ({
  requestError,
  requestStatus,
  resetHookState,
  setFormData,
  initialValues,
  resetComponent,
}) => {
  const initialFormValues = initialValues || {
    collectionName: "",
    collectionTopic: "",
    collectionDescription: "",
  };

  const { validateSingleTextField, validateMultilineTextField } =
    validationTemplates;

  const schema = yup.object().shape({
    collectionName: validateSingleTextField,
    collectionTopic: yup.string().required("Field is required"),
    collectionDescription: validateMultilineTextField,
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
          <ReusableFormField
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

          <ReusableFormField
            name="collectionDescription"
            label="Collection Description*"
            as="textarea"
            placeholder="My collection is about..."
            style={{ minHeight: "100px" }}
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

          {!!requestError && requestStatus !== "loading" && (
            <ErrorAlert {...{ requestError, retryRequest: resetHookState }} />
          )}

          {!requestError && (
            <div className="d-flex justify-content-end gap-3">
              <Button
                variant="secondary"
                type="button"
                disabled={isDisabled}
                onClick={resetComponent}
              >
                Cancel
              </Button>
              <Button disabled={isDisabled} variant="success" type="submit">
                {!isDisabled && "SAVE"}
                {isDisabled && <Spinner animation="border" />}
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EditCollectionForm;
