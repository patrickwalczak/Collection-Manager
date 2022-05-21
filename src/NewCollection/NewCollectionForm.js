import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { Formik } from "formik";
import * as yup from "yup";

import CollectionTopic from "./CollectionTopic";
import CollectionImg from "./CollectionImg";
import CustomItemQuestion from "./CustomItemQuestion";
import CustomFieldInputs from "./CustomFieldInputs";
import ReusableFieldName from "../SignUp/ReusableFieldName";

import { validationTemplates } from "../helpers/yupHelper";

const NewCollectionForm = ({
  requestError,
  requestStatus,
  resetHookState,
  setFormData,
}) => {
  const {
    validateSingleTextField,
    validateMultilineTextField,
    validateRadioField,
    validateCustomFieldsNames,
  } = validationTemplates;

  const initialFormValues = {
    collectionName: "",
    collectionTopic: "",
    collectionDescription: "",
    chosenNumberOfCustomTextFields: "",
    customTextFieldsNames: [],
    chosenNumberOfCustomNumberFields: "",
    customNumberFieldsNames: [],
    chosenNumberOfCustomMultilineTextFields: "",
    customMultilineTextFieldsNames: [],
    chosenNumberOfBooleanFields: "",
    customBooleanFieldsNames: [],
    chosenNumberOfDateFields: "",
    customDateFieldsNames: [],
  };

  const isRequiredErrorMessage = "Field is required!";

  const schema = yup.object().shape({
    collectionName: validateSingleTextField,
    collectionTopic: yup.string().required(isRequiredErrorMessage),
    collectionDescription: validateMultilineTextField,
    chosenNumberOfCustomTextFields: validateRadioField,
    chosenNumberOfCustomNumberFields: validateRadioField,
    chosenNumberOfCustomMultilineTextFields: validateRadioField,
    chosenNumberOfBooleanFields: validateRadioField,
    chosenNumberOfDateFields: validateRadioField,
    customTextFieldsNames: validateCustomFieldsNames,
    customNumberFieldsNames: validateCustomFieldsNames,
    customMultilineTextFieldsNames: validateCustomFieldsNames,
    customBooleanFieldsNames: validateCustomFieldsNames,
    customDateFieldsNames: validateCustomFieldsNames,
  });

  const numberOfCustomFieldsOptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

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

          <CollectionImg name="collectionImg" setImg={setFieldValue} />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="chosenNumberOfCustomTextFields"
            fieldsNamesId="customTextFieldsNames"
            fieldsNamesList={values.customTextFieldsNames}
            options={numberOfCustomFieldsOptions}
            question={
              "How many single line text should your collection items have?*"
            }
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
            options={numberOfCustomFieldsOptions}
            fieldsNamesId="customNumberFieldsNames"
            fieldsNamesList={values.customNumberFieldsNames}
            question={
              "How many number fields should your collection items have?*"
            }
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
            options={numberOfCustomFieldsOptions}
            question={
              "How many multiline text fields should your collection items have?*"
            }
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
            options={numberOfCustomFieldsOptions}
            question={
              "How many true/false checkboxes should your collection items have?*"
            }
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
            options={numberOfCustomFieldsOptions}
            question={
              "How many date fields should your collection items have?*"
            }
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
