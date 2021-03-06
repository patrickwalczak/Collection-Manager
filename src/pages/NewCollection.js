import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

import useHttp from "../shared/hooks/useHttp";
import AppContext from "../shared/context/app-context";

import NewCollectionForm from "../Components/NewCollection/NewCollectionForm";

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FormattedMessage } from "react-intl";

function NewCollection() {
  const [submittedFormData, setFormData] = useState(null);
  const [file, setFile] = useState(null);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const {
    requestError: uploadImageRequestError,
    requestStatus: uploadImageRequestStatus,
    sendRequest: uploadImageRequest,
    resetHookState: uploadImageResetHookState,
  } = useHttp();

  const { token, theme } = useContext(AppContext);

  const { userId } = useParams();

  const navigate = useNavigate();

  const createCollection = async () => {
    const filteredFormObject = filterSubmittedForm(submittedFormData);
    try {
      if (!!file) await uploadImage(filteredFormObject);

      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/collections/${userId}/createCollection`,
        {
          method: "POST",
          body: JSON.stringify({ ...filteredFormObject }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response) throw "";
      setFormData(null);
      navigate(`/user/${userId}`);
    } catch (err) {
      setFormData(null);
    }
  };

  const uploadImage = async (filteredFormObject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cay9rmuu");

    try {
      const responseData = await uploadImageRequest(
        `https://api.cloudinary.com/v1_1/dfmqabv0s/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      filteredFormObject.collectionImage = responseData.url;
      filteredFormObject.collectionImageID = responseData.public_id;
    } catch (err) {
      throw err;
    }
  };

  const filterSubmittedForm = (formData) => {
    if (!formData) return;
    const propertyKey = 0;
    const filteredFormPropertiesArray = Object.entries(formData).filter(
      (formProperty) => !formProperty[propertyKey].includes("chosenNumber")
    );
    const formDataObject = Object.fromEntries(filteredFormPropertiesArray);
    formDataObject.collectionImage = "";
    formDataObject.collectionImageID = "";
    return formDataObject;
  };

  useEffect(() => {
    if (!submittedFormData) return;
    createCollection();
  }, [submittedFormData]);

  return (
    <Container
      fluid
      data-theme={theme}
      className="themeClass rounded shadow border col-xs-11 col-sm-10 col-md-8 col-lg-6 col-xl-5"
    >
      <div className="d-flex p-4 justify-content-center border-bottom mb-3">
        <h1>
          <FormattedMessage id="new.collection.form.heading" />
        </h1>
      </div>

      <NewCollectionForm
        {...{
          requestError,
          requestStatus,
          uploadImageRequestError,
          resetHookState,
          setFormData,
          setFile,
          uploadImageRequestStatus,
          uploadImageResetHookState,
        }}
      />
    </Container>
  );
}

export default NewCollection;
