import { useEffect, useState, useCallback } from "react";

import useHttp from "../hooks/useHttp";

import ModalTemplate from "../UI/ModalTemplate";
import AddItemForm from "./AddItemForm";

const AddItem = ({
  modalVisibilityState,
  handleCloseModal,
  customItemProperties,
  collectionID,
  loggedUserId,
  token,
}) => {
  const [submittedFormData, setFormData] = useState(null);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const editCollection = useCallback(async (formData) => {
    console.log(formData);
    // try {
    //   const returnedData = await sendRequest(
    //     `http://localhost:5000/api/collections/${collectionID}/editCollection`,
    //     {
    //       method: "PATCH",
    //       body: JSON.stringify({ userId: loggedUserId, ...formData }),
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + token,
    //       },
    //     }
    //   );
    //   if (!returnedData) throw "";

    //   resetHookState();
    //   setFormData(null);
    //   handleCloseModal();
    // } catch (err) {
    //   setFormData(null);
    // }
  }, []);

  useEffect(() => {
    if (!submittedFormData) return;
    editCollection(submittedFormData);
  }, [submittedFormData, editCollection]);

  const {
    textFields,
    numberFields,
    multilineTextFields,
    dateFields,
    booleanFields,
  } = customItemProperties;

  return (
    <ModalTemplate
      modalHeading="Add Item"
      modalState={modalVisibilityState}
      handleCloseModal={handleCloseModal}
    >
      <AddItemForm
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
        customItemProperties={customItemProperties}
      />
    </ModalTemplate>
  );
};
export default AddItem;
