import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { useEffect, useState, useCallback } from "react";

import useHttp from "../hooks/useHttp";

import ModalTemplate from "../UI/ModalTemplate";
import EditCollectionForm from "./EditCollectionForm";

const EditCollection = ({
  modalVisibilityState,
  handleCloseModal,
  collectionData,
  collectionID,
  token,
  clearCollectionStates,
  triggerUpdate,
}) => {
  const [submittedFormData, setFormData] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const resetComponent = () => {
    handleCloseModal();
    setFormData(null);
    clearCollectionStates();
    resetHookState();
    setSuccessMessage("");
  };

  const editCollection = useCallback(async (formData) => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/${collectionID}/editCollection`,
        {
          method: "PATCH",
          body: JSON.stringify({ ...formData }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";

      const { collection } = returnedData;

      setSuccessMessage(returnedData.message);
      triggerUpdate();
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!submittedFormData || !!requestStatus) return;
    editCollection(submittedFormData);
  }, [submittedFormData, editCollection, requestStatus]);

  return (
    <ModalTemplate
      modalHeading="Edit Collection"
      modalState={modalVisibilityState}
      handleCloseModal={resetComponent}
    >
      {!successMessage && (
        <EditCollectionForm
          requestError={requestError}
          requestStatus={requestStatus}
          resetHookState={resetHookState}
          setFormData={setFormData}
          handleCloseModal={handleCloseModal}
          initialValues={collectionData}
        />
      )}
      {!!successMessage && (
        <Alert variant="success">
          <Alert.Heading>{successMessage}</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={resetComponent} variant="outline-success">
              Great!
            </Button>
          </div>
        </Alert>
      )}
    </ModalTemplate>
  );
};
export default EditCollection;
