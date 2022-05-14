import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { useEffect, useState, useCallback } from "react";

import useHttp from "../hooks/useHttp";

import ModalTemplate from "../UI/ModalTemplate";
import ItemFormTemplate from "./ItemFormTemplate";

const ItemActionController = ({
  heading,
  modalVisibilityState,
  handleCloseModal,
  customItemSchema,
  itemData,
  token,
  url,
  requestMethod,
  clearItemStates,
  triggerUpdate,
}) => {
  const [submittedFormData, setFormData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const resetComponent = () => {
    handleCloseModal();
    setFormData(null);
    clearItemStates();
    resetHookState();
    setSuccessMessage("");
  };

  const createItem = useCallback(async (formData) => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/${url}`,
        {
          method: requestMethod,
          body: JSON.stringify({ formData }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";

      setSuccessMessage(returnedData.message);
      triggerUpdate();
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!submittedFormData || !!requestStatus) return;
    createItem(submittedFormData);
  }, [submittedFormData, createItem, requestStatus]);

  const submitButtonText = !!itemData ? "SAVE" : "CREATE";

  const {
    textFields,
    numberFields,
    multilineTextFields,
    dateFields,
    booleanFields,
  } = customItemSchema;

  return (
    <ModalTemplate
      modalHeading={heading}
      modalState={modalVisibilityState}
      handleCloseModal={resetComponent}
    >
      {!successMessage && (
        <ItemFormTemplate
          requestError={requestError}
          requestStatus={requestStatus}
          resetHookState={resetHookState}
          setFormData={setFormData}
          handleCloseModal={handleCloseModal}
          textFields={textFields}
          numberFields={numberFields}
          multilineTextFields={multilineTextFields}
          dateFields={dateFields}
          booleanFields={booleanFields}
          customItemSchema={customItemSchema}
          itemData={itemData}
          actionButtonText={submitButtonText}
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
export default ItemActionController;
