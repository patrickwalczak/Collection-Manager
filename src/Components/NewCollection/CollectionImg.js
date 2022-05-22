import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Drop from "./Drop";

const CollectionImg = ({ name, setImg, label }) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Drop setImg={setImg} name={name} />
    </Form.Group>
  );
};

export default CollectionImg;
