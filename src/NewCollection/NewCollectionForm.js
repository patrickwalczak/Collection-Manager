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

const NewCollectionForm = (props) => {
  const initialValues = props.enteredFormData || {
    collectionName: "",
    collectionTopic: "",
    collectionDescription: "",
    customItemTxt: "",
    customItemNum: "",
    customItemMultiTxt: "",
    customItemBool: "",
    customItemDate: "",
  };

  const customItemErrMsg = "You have to choose one option";

  const schema = yup.object().shape({
    collectionName: yup
      .string()
      .trim()
      .min(3, "Collection name is to short")
      .max(25, "Collection name is too long")
      .test({
        message: "Collection name cannot contain special characters",
        test: (name) => {
          if (!name) return true;
          return (
            name.match(/[`!@#$ %^&*()_+\-=\[\]{};':"\\|,.<>\/? ~]/) === null
          );
        },
      })
      .required(),
    collectionTopic: yup.string().required("Collection topic is required!"),
    collectionTags: yup
      .array()
      .test({
        message: "Collection tags are required!",
        test: (arr) => arr.length !== 0,
      })
      .required(),
    collectionDescription: yup
      .string()
      .trim()
      .max(300)
      .min(1, "Description must have at least 1 character!")
      .required(),
    customItemTxt: yup.string().min(1, customItemErrMsg).required(),
    customItemNum: yup.string().min(1, customItemErrMsg).required(),
    customItemMultiTxt: yup.string().min(1, customItemErrMsg).required(),
    customItemBool: yup.string().min(1, customItemErrMsg).required(),
    customItemDate: yup.string().min(1, customItemErrMsg).required(),
  });

  const customItemOptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

  return (
    <Formik
      validationSchema={schema}
      onSubmit={props.getFormData}
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        setFieldValue,
        setFieldError,
        setFieldTouched,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <CollectionName
            name="collectionName"
            onChange={handleChange}
            onBlur={handleBlur}
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
            defValue={values.collectionTopic}
          />

          <CollectionDescription
            placeholder="My collection is about..."
            name="collectionDescription"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={
              touched.collectionDescription && errors.collectionDescription
            }
            isValid={
              values.collectionDescription && !errors.collectionDescription
            }
            value={values.collectionDescription}
            error={errors.collectionDescription}
          />

          <SelectTags />

          {/* TODO how to set default image */}
          <CollectionImg name="collectionImg" setImg={setFieldValue} />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemTxt"
            options={customItemOptions}
            question={
              "How many single line text should your collection items have?*"
            }
            errors={errors}
            touched={touched}
            value={values.customItemTxt}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemNum"
            options={customItemOptions}
            question={
              "How many number fields should your collection items have?*"
            }
            errors={errors}
            touched={touched}
            value={values.customItemNum}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemMultiTxt"
            options={customItemOptions}
            question={
              "How many multiline text fields should your collection items have?*"
            }
            errors={errors}
            touched={touched}
            value={values.customItemMultiTxt}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemBool"
            options={customItemOptions}
            question={
              "How many true/false checkboxes should your collection items have?*"
            }
            errors={errors}
            touched={touched}
            value={values.customItemBool}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemDate"
            options={customItemOptions}
            question={
              "How many date fields should your collection items have?*"
            }
            errors={errors}
            touched={touched}
            value={values.customItemDate}
          />

          <Button
            // disabled={
            //   !(
            //     Object.keys(touched).length === Object.keys(values).length &&
            //     isValid
            //   )
            // }
            type="submit"
          >
            NEXT
          </Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify(touched, null, 2)}</pre>
          <pre>{JSON.stringify(isValid, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default NewCollectionForm;
