import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import { useContext } from "react";

import AppContext from "../store/app-context";

const ReusableFieldName = ({
  name,
  label,
  error,
  setFieldTouched,
  setFieldValue,
  ...restInputProps
}) => {
  const { theme } = useContext(AppContext);

  const changeInput = (e) => {
    setFieldTouched(name);
    setFieldValue(name, e.target.value);
  };

  return (
    <Form.Group className="mb-2 mb-md-3 mb-xl-4" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className="inputThemeClass"
        name={name}
        onChange={changeInput}
        {...restInputProps}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default ReusableFieldName;
