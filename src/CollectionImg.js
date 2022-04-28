import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Drop from "./Drop";

const CollectionImg = ({ name, setImg }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>Collection image (optional)</Form.Label>
      <Drop setImg={setImg} name={name} />
    </Form.Group>
  );
};

export default CollectionImg;
