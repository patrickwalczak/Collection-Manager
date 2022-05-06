import { Formik } from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import CollectionName from "./CollectionName";
import CollectionTopic from "./CollectionTopic";
import CollectionDescription from "./CollectionDescription";
import CollectionImg from "./CollectionImg";
import CustomItemQuestion from "./CustomItemQuestion";
import SelectTags from "./SelectTags";
import FieldsNames from "./FieldsNames";

const NewCollectionForm = () => {
  const initialFormValues = {
    collectionName: "",
    collectionTopic: "",
    collectionDescription: "",
    collectionTags: [],
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
      .matches(
        /^[A-Za-z0-9_.]+$/,
        "Collection name cannot contain special characters"
      )
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
    chosenNumberOfCustomTextFields: yup
      .string()
      .required(checkQuestionErrorMessage),
    chosenNumberOfCustomNumberFields: yup
      .string()
      .required(checkQuestionErrorMessage),
    chosenNumberOfCustomMultilineTextFields: yup
      .string()
      .required(checkQuestionErrorMessage),
    chosenNumberOfBooleanFields: yup
      .string()
      .required(checkQuestionErrorMessage),
    chosenNumberOfDateFields: yup.string().required(checkQuestionErrorMessage),
    customTextFieldsNames: yup.array().test(customFieldsNamesTest),
    customNumberFieldsNames: yup.array().test(customFieldsNamesTest),
    customMultilineTextFieldsNames: yup.array().test(customFieldsNamesTest),
    customBooleanFieldsNames: yup.array().test(customFieldsNamesTest),
    customDateFieldsNames: yup.array().test(customFieldsNamesTest),
  });

  const numberOfCustomFieldsOptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(data) => console.log(data)}
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
          <CollectionName
            name="collectionName"
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            isInvalid={touched.collectionName && errors.collectionName}
            isValid={values.collectionName && !errors.collectionName}
            error={errors.collectionName}
            value={values.collectionName}
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

          <CollectionDescription
            name="collectionDescription"
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            isInvalid={
              touched.collectionDescription && errors.collectionDescription
            }
            isValid={
              values.collectionDescription && !errors.collectionDescription
            }
            value={values.collectionDescription}
            error={errors.collectionDescription}
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

          {/* TODO how to set default image */}
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
          />

          <FieldsNames
            amount={values.chosenNumberOfCustomTextFields}
            name="customTextFieldsNames"
            fieldsNamesList={values.customTextFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customTextFieldsNames}
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
          />

          <FieldsNames
            amount={values.chosenNumberOfCustomNumberFields}
            name="customNumberFieldsNames"
            fieldsNamesList={values.customNumberFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customNumberFieldsNames}
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
          />

          <FieldsNames
            amount={values.chosenNumberOfCustomMultilineTextFields}
            name="customMultilineTextFieldsNames"
            fieldsNamesList={values.customMultilineTextFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customMultilineTextFieldsNames}
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
          />

          <FieldsNames
            amount={values.chosenNumberOfBooleanFields}
            name="customBooleanFieldsNames"
            fieldsNamesList={values.customBooleanFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customBooleanFieldsNames}
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
          />

          <FieldsNames
            amount={values.chosenNumberOfDateFields}
            name="customDateFieldsNames"
            fieldsNamesList={values.customDateFieldsNames}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            error={errors.customDateFieldsNames}
          />

          <div className="d-flex justify-content-end gap-3">
            <Button
              className="col-2"
              variant="secondary"
              onClick={handleReset}
              type="button"
            >
              RESET
            </Button>
            <Button className="col-4" variant="success" type="submit">
              CREATE
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewCollectionForm;
