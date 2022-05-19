import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import SearchForm from "./SearchForm";

const SearchModal = ({ modalVisibility, closeModal }) => {
  return (
    <Modal show={modalVisibility} fullscreen={true} onHide={closeModal}>
      <Modal.Header className="border-none" closeButton>
        <Modal.Title>Search for items in collections</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SearchForm closeModal={closeModal} />
      </Modal.Body>
    </Modal>
  );
};
export default SearchModal;
