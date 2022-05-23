import "bootstrap/dist/css/bootstrap.min.css";

import ModalTemplate from "../../common/UI/ModalTemplate";
import SuccessAlert from "../../common/UI/SuccessAlert";

import ItemFormTemplate from "./ItemFormTemplate";

import { useEffect, useState, useCallback } from "react";

import useHttp from "../../hooks/useHttp";

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

  const submitButtonText = !!itemData ? "SAVE" : "CREATE";

  const {
    textFields,
    numberFields,
    multilineTextFields,
    dateFields,
    booleanFields,
  } = customItemSchema;

  const resetComponent = () => {
    setFormData(null);
    clearItemStates();
    resetHookState();
    setSuccessMessage("");
    handleCloseModal();
  };

  const convertBooleanValuesToString = (formData) => {
    booleanFields.forEach(
      (booleanField) =>
        (formData[booleanField] = formData[booleanField].toString())
    );
  };

  const createItem = useCallback(async (formData) => {
    try {
      convertBooleanValuesToString(formData);
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/${url}`,
        {
          method: requestMethod,
          body: JSON.stringify({
            ...formData,
            tags: formData.tags[0]?.value
              ? formData.tags.map(({ value }) => value)
              : formData.tags,
          }),
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
        <SuccessAlert {...{ successMessage, onCloseModal: resetComponent }} />
      )}
    </ModalTemplate>
  );
};
export default ItemActionController;
