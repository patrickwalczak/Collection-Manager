import "bootstrap/dist/css/bootstrap.min.css";

import Form from "react-bootstrap/Form";

import SearchController from "./SearchController";

const SearchForm = ({ closeModal }) => {
  return <SearchController closeModal={closeModal} />;
};

export default SearchForm;
