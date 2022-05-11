import { useEffect, useState, useContext, useCallback } from "react";

import useHttp from "../hooks/useHttp";
import AppContext from "../store/app-context";

import ModalTemplate from "../UI/ModalTemplate";
import EditCollectionForm from "./EditCollectionForm";

const EditCollection = ({
  modalVisibilityState,
  handleCloseModal,
  collectionData,
  collectionID,
}) => {
  const [submittedFormData, setFormData] = useState(null);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const { userId, userType, token } = useContext(AppContext);

  // const {
  //   collectionDescription,
  //   collectionName,
  //   collectionTags,
  //   collectionTopic,
  // } = collectionData;

  const editCollection = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/${userId}/createCollection`,
        {
          method: "POST",
          body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!returnedData) throw "";
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!submittedFormData) return;
    editCollection();
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
