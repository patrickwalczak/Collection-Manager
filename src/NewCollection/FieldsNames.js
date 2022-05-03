import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const FieldsNames = ({ amount, inputType }) => {
  return Array.from(new Array(+amount), (v, i) => (
    <Form.Group key={i} className="mb-1" controlId={inputType + i}>
      <Form.Label>Field name*</Form.Label>
      <Form.Control
        type="text"
        name={inputType + i}
        onBlur={() => {}}
        onChange={() => {}}
      />
      <Form.Control.Feedback type="invalid">
        Sth went wrong
      </Form.Control.Feedback>

      <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
    </Form.Group>
  ));
};

export default FieldsNames;
