import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CollectionName = ({
  name,
  error,
  setTouched,
  setValue,
  ...restInputProps
}) => {
  const changeInput = (e) => {
    const enteredName = e.target.value;
    setTouched(name);
    setValue(name, enteredName);
  };

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>Collection Name*</Form.Label>
      <Form.Control
        name={name}
        placeholder="The greatest collection"
        type="text"
        autoFocus
        onBlur={() => setTouched(name)}
        onChange={changeInput}
        {...restInputProps}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CollectionName;
