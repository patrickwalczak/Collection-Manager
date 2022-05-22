import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

function ModalTemplate(props) {
  return (
    <Modal show={props.modalState} onHide={props.handleCloseModal}>
      <Modal.Header className="themeClass" closeButton>
        <Modal.Title>{props.modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="themeClass">{props.children}</Modal.Body>
    </Modal>
  );
}

export default ModalTemplate;
