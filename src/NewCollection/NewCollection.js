import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

import useHttp from "../hooks/useHttp";
import AppContext from "../store/app-context";

import NewCollectionForm from "./NewCollectionForm";

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FormattedMessage } from "react-intl";

function NewCollection() {
  const [submittedFormData, setFormData] = useState(null);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const { userId: loggedUserId, token, theme } = useContext(AppContext);

  const { userId } = useParams();

  const navigate = useNavigate();

  const createCollection = async () => {
    const filteredFormObject = filterSubmittedForm(submittedFormData);

    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/collections/${userId}/createCollection`,
        {
          method: "POST",
          body: JSON.stringify({
            ...filteredFormObject,
          }),
          headers: {
            "Content-Type": "application/json",
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
        requestError={requestError}
        requestStatus={requestStatus}
        resetHookState={resetHookState}
        setFormData={setFormData}
      />
    </Container>
  );
}

export default NewCollection;
