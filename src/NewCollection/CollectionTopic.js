import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectTopic from "./SelectTopic";

const CollectionTopic = (props) => {
  const { error, isTouched, name, label } = props;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <SelectTopic {...props} />
      {!error && isTouched && (
        <div style={{ display: "block" }} className="valid-feedback">
          Looks good!
        </div>
      )}
      {error && isTouched && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {error}
        </div>
      )}
    </Form.Group>
  );
};

export default CollectionTopic;
