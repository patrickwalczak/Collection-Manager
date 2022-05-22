import "bootstrap/dist/css/bootstrap.min.css";

import Form from "react-bootstrap/Form";

import SearchController from "./SearchController";

const SearchForm = ({ closeModal }) => {
  return (
    <Form>
      <SearchController closeModal={closeModal} />
    </Form>
  );
};

export default SearchForm;
