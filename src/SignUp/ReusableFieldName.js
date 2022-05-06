import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const ReusableFieldName = ({
  name,
  label,
  error,
  setValue,
  setTouched,
  ...restInputProps
}) => {
  const changeInput = (e) => {
    setValue(name, e.target.value);
    setTouched(name);
  };

  return (
    <Form.Group className="mb-2 mb-md-3 mb-xl-4" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} {...restInputProps} onChange={changeInput} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default ReusableFieldName;
