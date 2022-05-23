import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import CollectionTopic from "./CollectionTopic";
import CustomItemQuestion from "./CustomItemQuestion";
import CustomFieldInputs from "./CustomFieldInputs";
import ReusableFormField from "../ReusableFormField";

import { FormattedMessage } from "react-intl";

import { Formik } from "formik";
import * as yup from "yup";

import { validationTemplates } from "../../helpers/yupHelper";

const NewCollectionForm = ({
  requestError,
  requestStatus,
  resetHookState,
  setFormData,
}) => {
  const {
    validateSingleTextField,
    validateMultilineTextField,
    validateCustomFieldsNames,
    validateNumberField,
  } = validationTemplates;

  const initialFormValues = {
    collectionName: "",
    collectionTopic: "",
    collectionDescription: "",
    chosenNumberOfCustomTextFields: 0,
    customTextFieldsNames: [],
    chosenNumberOfCustomNumberFields: 0,
    customNumberFieldsNames: [],
    chosenNumberOfCustomMultilineTextFields: 0,
    customMultilineTextFieldsNames: [],
    chosenNumberOfBooleanFields: 0,
    customBooleanFieldsNames: [],
    chosenNumberOfDateFields: 0,
    customDateFieldsNames: [],
  };

  const isRequiredErrorMessage = "Field is required!";

  const schema = yup.object().shape({
    collectionName: validateSingleTextField,
    collectionTopic: yup.string().required(isRequiredErrorMessage),
    collectionDescription: validateMultilineTextField,
    chosenNumberOfCustomTextFields: validateNumberField.min(
      0,
      "Input cannot be empty, if you do not need this input type, enter 0"
    ),
    chosenNumberOfCustomNumberFields: validateNumberField.min(0),
    chosenNumberOfCustomMultilineTextFields: validateNumberField.min(0),
    chosenNumberOfBooleanFields: validateNumberField.min(0),
    chosenNumberOfDateFields: validateNumberField.min(0),
    customTextFieldsNames: validateCustomFieldsNames,
    customNumberFieldsNames: validateCustomFieldsNames,
    customMultilineTextFieldsNames: validateCustomFieldsNames,
    customBooleanFieldsNames: validateCustomFieldsNames,
    customDateFieldsNames: validateCustomFieldsNames,
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
        <Form noValidate onSubmit={handleSubmit} className="pb-4 themeCLass">
          <ReusableFormField
            autoFocus
            name="collectionName"
            label={<FormattedMessage id="new.collection.form.name" />}
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
            label={<FormattedMessage id="new.collection.form.topic" />}
            error={errors.collectionTopic}
            isTouched={touched.collectionTopic}
            setValue={setFieldValue}
            setError={setFieldError}
            setTouched={setFieldTouched}
            value={values.collectionTopic}
          />

          <ReusableFormField
            name="collectionDescription"
            label={<FormattedMessage id="new.collection.form.description" />}
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

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="chosenNumberOfCustomTextFields"
            fieldsNamesId="customTextFieldsNames"
            fieldsNamesList={values.customTextFieldsNames}
            question={<FormattedMessage id="new.collection.form.question1" />}
            errors={errors}
            touched={touched}
            value={values.chosenNumberOfCustomTextFields}
            isDisabled={isDisabled}
          />

          <CustomFieldInputs
            amount={values.chosenNumberOfCustomTextFields}
            name="customTextFieldsNames"
            fieldsNamesList={values.customTextFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customTextFieldsNames}
            isDisabled={isDisabled}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="chosenNumberOfCustomNumberFields"
            fieldsNamesId="customNumberFieldsNames"
            fieldsNamesList={values.customNumberFieldsNames}
            question={<FormattedMessage id="new.collection.form.question2" />}
            errors={errors}
            touched={touched}
            value={values.chosenNumberOfCustomNumberFields}
            isDisabled={isDisabled}
          />

          <CustomFieldInputs
            amount={values.chosenNumberOfCustomNumberFields}
            name="customNumberFieldsNames"
            fieldsNamesList={values.customNumberFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customNumberFieldsNames}
            isDisabled={isDisabled}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="chosenNumberOfCustomMultilineTextFields"
            fieldsNamesId="customMultilineTextFieldsNames"
            fieldsNamesList={values.customMultilineTextFieldsNames}
            question={<FormattedMessage id="new.collection.form.question3" />}
            errors={errors}
            touched={touched}
            value={values.chosenNumberOfCustomMultilineTextFields}
            isDisabled={isDisabled}
          />

          <CustomFieldInputs
            amount={values.chosenNumberOfCustomMultilineTextFields}
            name="customMultilineTextFieldsNames"
            fieldsNamesList={values.customMultilineTextFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customMultilineTextFieldsNames}
            isDisabled={isDisabled}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="chosenNumberOfBooleanFields"
            fieldsNamesId="customBooleanFieldsNames"
            fieldsNamesList={values.customBooleanFieldsNames}
            question={<FormattedMessage id="new.collection.form.question4" />}
            errors={errors}
            touched={touched}
            value={values.chosenNumberOfBooleanFields}
            isDisabled={isDisabled}
          />

          <CustomFieldInputs
            amount={values.chosenNumberOfBooleanFields}
            name="customBooleanFieldsNames"
            fieldsNamesList={values.customBooleanFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customBooleanFieldsNames}
            isDisabled={isDisabled}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="chosenNumberOfDateFields"
            fieldsNamesId="customDateFieldsNames"
            fieldsNamesList={values.customDateFieldsNames}
            question={<FormattedMessage id="new.collection.form.question5" />}
            errors={errors}
            touched={touched}
            value={values.chosenNumberOfDateFields}
            isDisabled={isDisabled}
          />

          <CustomFieldInputs
            amount={values.chosenNumberOfDateFields}
            name="customDateFieldsNames"
            fieldsNamesList={values.customDateFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customDateFieldsNames}
            isDisabled={isDisabled}
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
              onClick={handleReset}
              type="button"
              disabled={isDisabled}
            >
              RESET
            </Button>
            <Button
              disabled={isDisabled}
              className="col-4 themeClass btn-light"
              type="submit"
            >
              {!isDisabled && "CREATE"}
              {isDisabled && <Spinner animation="border" />}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewCollectionForm;
