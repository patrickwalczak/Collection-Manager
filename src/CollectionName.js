import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CollectionName = ({
  name,
  onChange,
  onBlur,
  isInvalid,
  isValid,
  error,
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>Collection Name*</Form.Label>
      <Form.Control
        type="text"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={isInvalid}
        isValid={isValid}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>

      <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CollectionName;
