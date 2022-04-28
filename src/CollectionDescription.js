import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CollectionDescription = ({
  placeholder,
  name,
  onBlur,
  onChange,
  isInvalid,
  isValid,
  errors,
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>Collection description*</Form.Label>
      <Form.Control
        placeholder={placeholder}
        name={name}
        as="textarea"
        onBlur={onBlur}
        onChange={onChange}
        isInvalid={isInvalid}
        isValid={isValid}
      />
      <Form.Control.Feedback type="invalid">
        {errors.collectionDescription}
      </Form.Control.Feedback>
      <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CollectionDescription;
