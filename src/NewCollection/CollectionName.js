import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CollectionName = (props) => {
  const { name, error } = props;
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>Collection Name*</Form.Label>
      <Form.Control type="text" {...props} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>

      <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CollectionName;
