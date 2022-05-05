import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CollectionDescription = (props) => {
  const { name, error, ...inputProps } = props;
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>Collection description*</Form.Label>
      <Form.Control
        name={name}
        as="textarea"
        placeholder="My collection is about..."
        style={{ height: "100px" }}
        {...inputProps}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CollectionDescription;
