import NewCollectionForm from "./NewCollectionForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import CustomItemFieldsNames from "./CustomItemsFieldsNames";

function NewCollection() {
  const [formPartOneIsNotSubmitted, setPartOneSubmission] = useState(true);
  const [enteredFormData, setEnteredFormData] = useState(null);

  const getFormData = (data) =>
    setEnteredFormData((prevState) => {
      return { ...prevState, ...data };
    });

  useEffect(() => {
    if (!enteredFormData) return;
    setPartOneSubmission(false);
  }, [enteredFormData]);

  return (
    <Container fluid className="card col-5">
      <div className="d-flex p-4 justify-content-center border-bottom mb-3">
        <h1>CREATE COLLECTION</h1>
      </div>
      {formPartOneIsNotSubmitted && (
        <NewCollectionForm
          enteredFormData={enteredFormData}
          getFormData={getFormData}
        />
      )}
      {!formPartOneIsNotSubmitted && (
        <CustomItemFieldsNames setPartOneSubmission={setPartOneSubmission} />
      )}
    </Container>
  );
}

export default NewCollection;
