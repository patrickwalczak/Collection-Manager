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

  const { token, theme } = useContext(AppContext);

  const { userId } = useParams();

  const navigate = useNavigate();

  const createCollection = async () => {
    const filteredFormObject = filterSubmittedForm(submittedFormData);

    const convertedFormData = convertFormData(filteredFormObject);

    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/collections/${userId}/createCollection`,
        {
          method: "POST",
          body: convertedFormData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!returnedData) throw "";
      resetHookState();
      setFormData(null);
      navigate(`/user/${userId}`);
    } catch (err) {
      setFormData(null);
    }
  };

  const filterSubmittedForm = (formData) => {
    if (!formData) return;
    const propertyKey = 0;
    const filteredFormPropertiesArray = Object.entries(formData).filter(
      (formProperty) => !formProperty[propertyKey].includes("chosenNumber")
    );
    const formDataObject = Object.fromEntries(filteredFormPropertiesArray);
    return formDataObject;
  };

  const convertFormData = (collectionData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(collectionData)) {
      if (Array.isArray(value)) {
        if (!value.length) {
          formData.append(key, value);
        } else {
          for (const currentValue of value) {
            formData.append(key, currentValue);
          }
        }
      } else {
        formData.append(key, value);
      }
    }
    if (!!file) formData.append("image", file);
    return formData;
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
          resetHookState,
          setFormData,
          file,
          setFile,
        }}
      />
    </Container>
  );
}

export default NewCollection;
