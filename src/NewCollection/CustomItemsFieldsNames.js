import { Formik } from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomItemFieldsNames = (props) => {
  const schema = yup.object().shape({});

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(data) => {
        console.log(data);
      }}
      initialValues={{}}
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
        set,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Button
            onClick={props.setPartOneSubmission.bind(null, true)}
            type="button"
          >
            BACK
          </Button>
          <Button type="submit">CREATE</Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify(touched, null, 2)}</pre>
          <pre>{JSON.stringify(isValid, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default CustomItemFieldsNames;
