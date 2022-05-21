import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Spinner";

import { useParams } from "react-router-dom";
import { useEffect, useContext, useState, useCallback, Fragment } from "react";

import useHttp from "../hooks/useHttp";
import AppContext from "../store/app-context";

import CollectionsContainer from "./CollectionsContainer";
import UserProfileWrapper from "./UserProfileWrapper";
import ProfileHeader from "./ProfileHeader";
import EditCollection from "./EditCollection";
import DeleteController from "../UI/DeleteController";

const UserProfile = () => {
  const [collections, setCollections] = useState([]);
  const [collectionID, setCollectionID] = useState(null);
  const [collectionData, setCollectionData] = useState(null);
  const [modalVisibilityState, setModalVisibility] = useState(false);
  const [username, setUsername] = useState("");
  const [deleteCollectionFormVisibility, setDeleteItemFormVisibility] =
    useState(false);
  const handleUpdating = () => setIsBeingUpdated(true);
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);

  const {
    userId: loggedUserId,
    userType,
    token,
    theme,
  } = useContext(AppContext);

  const { userId } = useParams();

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const handleCloseModal = () => setModalVisibility(false);
  const handleShowModal = () => setModalVisibility(true);

  const handleClosingDeleteCollectionForm = () =>
    setDeleteItemFormVisibility(false);
  const handleOpeningDeleteItemForm = () => setDeleteItemFormVisibility(true);

  const getCollectionsByUserId = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/collections/user/${userId}`
      );
      if (!returnedData) throw "";
      const { collections, username } = returnedData;

      setUsername(username);
      setCollections(collections);
    } catch (err) {
      setCollections([]);
    }
  }, []);

  const getCollectionId = (e) => {
    const clickedCollectionID = e.target.closest("div").dataset.id;
    setCollectionID(clickedCollectionID);
    return clickedCollectionID;
  };

  const findAndConvertCollectionData = (id) => {
    const foundCollection = collections.find(
      (collection) => collection.id === id
    );
    const propertyKey = 0;
    const filteredCollectionPropertiesArray = Object.entries(
      foundCollection
    ).filter((collectionProperty) =>
      collectionProperty[propertyKey].includes("collection")
    );
    const collectionDataObject = Object.fromEntries(
      filteredCollectionPropertiesArray
    );
    setCollectionData(collectionDataObject);
  };

  const openEditForm = (e) => {
    const returnedCollectionID = getCollectionId(e);
    findAndConvertCollectionData(returnedCollectionID);
    handleShowModal();
  };

  const openDeleteForm = (e) => {
    const returnedCollectionID = getCollectionId(e);
    setCollectionID(returnedCollectionID);
    handleOpeningDeleteItemForm();
  };

  const clearCollectionStates = () => {
    setCollectionData(null);
    setCollectionID(null);
  };

  useEffect(() => {
    if (!userId || !!requestStatus) return;
    getCollectionsByUserId();
  }, [userId, getCollectionsByUserId, requestStatus]);

  useEffect(() => {
    if (!isBeingUpdated) return;
    setCollections([]);
    getCollectionsByUserId();
    setIsBeingUpdated(false);
  }, [getCollectionsByUserId, isBeingUpdated]);

  const displayOperationsButtons =
    !!token && (userType === "admin" || userId === loggedUserId);

  return (
    <Fragment>
      {!!collectionID && !!token && (
        <EditCollection
          modalVisibilityState={modalVisibilityState}
          handleCloseModal={handleCloseModal}
          collectionData={collectionData}
          collectionID={collectionID}
          loggedUserId={loggedUserId}
          token={token}
          clearCollectionStates={clearCollectionStates}
          triggerUpdate={handleUpdating}
        />
      )}
      {!!collections && !!collectionID && !!token && (
        <DeleteController
          modalVisibilityState={deleteCollectionFormVisibility}
          handleCloseModal={handleClosingDeleteCollectionForm}
          token={token}
          urlEndPath={`collections/${collectionID}/deleteCollection`}
          clearParentStates={clearCollectionStates}
          triggerParentUpdate={handleUpdating}
          modalHeading={"Delete Collection"}
        />
      )}

      <UserProfileWrapper>
        {false && (
          <ProfileHeader
            theme={theme}
            username={username}
            userId={userId}
            displayOperationsButtons={displayOperationsButtons}
          />
        )}
        {requestStatus === "completed" && !requestError && (
          <CollectionsContainer
            theme={theme}
            collections={collections}
            requestError={requestError}
            requestStatus={requestStatus}
            getCollectionId={getCollectionId}
            openEditForm={openEditForm}
            deleteCollection={openDeleteForm}
            displayOperationsButtons={displayOperationsButtons}
          />
        )}

        {!!requestError && requestStatus !== "loading" && (
          <Alert variant="danger">
            <Alert.Heading>{requestError}</Alert.Heading>
            <div className="mt-3 d-flex justify-content-end">
              <Button variant="danger" onClick={resetHookState}>
                Try again
              </Button>
            </div>
          </Alert>
        )}
        {requestStatus === "loading" && <Spinner animation="border" />}
      </UserProfileWrapper>
    </Fragment>
  );
};

export default UserProfile;
