import NewCollectionForm from "./NewCollectionForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

function NewCollection() {
  return (
    <Container
      fluid
      className="card col-xs-11 col-sm-10 col-md-8 col-lg-6 col-xl-5"
    >
      <div className="d-flex p-4 justify-content-center border-bottom mb-3">
        <h1>CREATE COLLECTION</h1>
      </div>
      <NewCollectionForm />
    </Container>
  );
}

export default NewCollection;
