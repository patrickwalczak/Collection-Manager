import { Formik } from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import CollectionName from "./CollectionName";
import CollectionTopic from "./CollectionTopic";
import CollectionDescription from "./CollectionDescription";
import CollectionTags from "./CollectionTags";
import CollectionImg from "./CollectionImg";
import CustomItemQuestion from "./CustomItemQuestion";

function App() {
  const optionMsg = "You have to choose one option";

  const schema = yup.object().shape({
    collectionName: yup
      .string()
      .trim()
      .min(3, "Collection name is to short")
      .max(20, "Collection name is too long"),
    collectionTopic: yup.string().required("Collection topic is required!"),
    collectionTags: yup.array().test({
      message: "Collection tags are required!",
      test: (arr) => arr.length !== 0,
    }),
    collectionDescription: yup
      .string()
      .trim()
      .max(300)
      .min(1, "Description must have at least 1 character without spaces"),
    customItemTxt: yup.string().min(1, optionMsg),
    customItemNum: yup.string().min(1, optionMsg),
    customItemMultiTxt: yup.string().min(1, optionMsg),
    customItemBool: yup.string().min(1, optionMsg),
    customItemDate: yup.string().min(1, optionMsg),
  });

  const customItemOptions = [
    { value: 0, label: "none" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(data) => {
        console.log(data);
      }}
      initialValues={{
        collectionName: "",
        collectionTopic: "",
        collectionTags: [],
        collectionDescription: "",
        customItemTxt: "",
        customItemNum: "",
        customItemMultiTxt: "",
        customItemBool: "",
        customItemDate: "",
      }}
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
            isInvalid={
              touched?.collectionName &&
              values.collectionName &&
              errors?.collectionName
            }
            isValid={values.collectionName && !errors?.collectionName}
            error={errors.collectionName}
          />
          <CollectionTopic
            name="collectionTopic"
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            setFieldTouched={setFieldTouched}
            value={values.collectionTopic}
          />

          <CollectionDescription
            placeholder="My collection is about..."
            name="collectionDescription"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={
              touched?.collectionDescription && errors?.collectionDescription
            }
            isValid={
              values.collectionDescription && !errors?.collectionDescription
            }
            errors={errors}
          />
          <CollectionTags
            name="collectionTags"
            setTags={setFieldValue}
            tagsList={values.collectionTags}
            setError={setFieldError}
            onTouch={setFieldTouched}
            errors={errors}
            touched={touched}
          />

          <CollectionImg name="collectionImg" setImg={setFieldValue} />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemTxt"
            options={customItemOptions}
            question={"How many single line text should your collection have?*"}
            errors={errors}
            touched={touched}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemNum"
            options={customItemOptions}
            question={"How many number fields should your collection have?*"}
            errors={errors}
            touched={touched}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemMultiTxt"
            options={customItemOptions}
            question={
              "How many multiline text fields should your collection have?*"
            }
            errors={errors}
            touched={touched}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemBool"
            options={customItemOptions}
            question={
              "How many true/false checkboxes should your collection have?*"
            }
            errors={errors}
            touched={touched}
          />

          <CustomItemQuestion
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            name="customItemDate"
            options={customItemOptions}
            question={"How many date fields should your collection have?*"}
            errors={errors}
            touched={touched}
          />

          <Button
            disabled={
              !(
                Object.keys(touched).length === Object.keys(values).length &&
                isValid
              )
            }
            type="submit"
          >
            Submit form
          </Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify(touched, null, 2)}</pre>
          <pre>{JSON.stringify(isValid, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default App;
