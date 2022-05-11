import { useEffect, useState, useCallback } from "react";

import useHttp from "../hooks/useHttp";

import ModalTemplate from "../UI/ModalTemplate";
import EditCollectionForm from "./EditCollectionForm";

const EditCollection = ({
  modalVisibilityState,
  handleCloseModal,
  collectionData,
  collectionID,
  setCollections,
  loggedUserId,
  token,
}) => {
  const [submittedFormData, setFormData] = useState(null);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const editCollection = useCallback(async (formData) => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/${collectionID}/editCollection`,
        {
          method: "PATCH",
          body: JSON.stringify({ userId: loggedUserId, ...formData }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";

      const { collection: updatedCollection } = returnedData;

      setCollections((prevState) => {
        const updatedCollectionIndex = prevState.find(
          (collection) => collection.id === updatedCollection.id
        );
        prevState[updatedCollectionIndex] = updatedCollection;
        return prevState;
      });
      resetHookState();
      setFormData(null);
      handleCloseModal();
    } catch (err) {
      setFormData(null);
    }
  }, []);

  useEffect(() => {
    if (!submittedFormData) return;
    editCollection(submittedFormData);
  }, [submittedFormData, editCollection]);

  return (
    <ModalTemplate
      modalHeading="Edit Collection"
      modalState={modalVisibilityState}
      handleCloseModal={handleCloseModal}
    >
      <EditCollectionForm
        requestError={requestError}
        requestStatus={requestStatus}
        resetHookState={resetHookState}
        setFormData={setFormData}
        handleCloseModal={handleCloseModal}
        initialValues={collectionData}
      />
    </ModalTemplate>
  );
};
export default EditCollection;
