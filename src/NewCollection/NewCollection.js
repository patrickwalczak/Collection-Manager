import NewCollectionForm from "./NewCollectionForm";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function NewCollection() {
  const [show, setShow] = useState(true);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewCollectionForm />
      </Modal.Body>
    </Modal>
  );
}

export default NewCollection;
