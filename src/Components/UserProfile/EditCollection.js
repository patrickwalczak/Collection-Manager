import { useEffect, useState, useCallback } from "react";

import useHttp from "../../hooks/useHttp";

import ModalTemplate from "../../common/UI/ModalTemplate";
import EditCollectionForm from "./EditCollectionForm";
import SuccessAlert from "../../common/UI/SuccessAlert";

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
        `${process.env.REACT_APP_BACKEND_URL}/collections/${collectionID}/editCollection`,
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
          {...{
            requestError,
            requestStatus,
            resetHookState,
            setFormData,
            handleCloseModal,
            resetComponent,
          }}
          initialValues={collectionData}
        />
      )}
      {!!successMessage && (
        <SuccessAlert {...{ successMessage, onCloseModal: resetComponent }} />
      )}
    </ModalTemplate>
  );
};
export default EditCollection;
