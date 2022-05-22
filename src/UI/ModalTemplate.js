import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import { useContext } from "react";

import AppContext from "../store/app-context";

function ModalTemplate(props) {
  const { theme } = useContext(AppContext);
  return (
    <Modal
      data-theme={theme}
      show={props.modalState}
      onHide={props.handleCloseModal}
    >
      <Modal.Header className="themeClass" closeButton>
        <Modal.Title>{props.modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="themeClass">{props.children}</Modal.Body>
    </Modal>
  );
}

export default ModalTemplate;

// tags in items table are displayed wrong
// item view - top link has wrong class
