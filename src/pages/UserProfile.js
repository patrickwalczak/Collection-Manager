import "bootstrap/dist/css/bootstrap.min.css";

import CenteredSpinner from "../UI/CenteredSpinner";
import ErrorAlert from "../UI/ErrorAlert";
import CollectionsContainer from "../Components/UserProfile/CollectionsContainer";
import UserProfileWrapper from "../Components/UserProfile/UserProfileWrapper";
import EditCollection from "../Components/UserProfile/EditCollection";
import DeleteController from "../UI/DeleteController";
import ProfileHeading from "../UserProfile/ProfileHeading";

import { useParams } from "react-router-dom";
import { useEffect, useContext, useState, useCallback, Fragment } from "react";

import useHttp from "../hooks/useHttp";
import AppContext from "../store/app-context";

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

  const displayOperationsButtons =
    !!token && (userType === "admin" || userId === loggedUserId);

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
    getCollectionsByUserId();
    setIsBeingUpdated(false);
  }, [getCollectionsByUserId, isBeingUpdated]);

  return (
    <Fragment>
      {!!collectionID && !!token && (
        <EditCollection
          {...{
            modalVisibilityState,
            handleCloseModal,
            collectionData,
            collectionID,
            loggedUserId,
            token,
            clearCollectionStates,
          }}
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
        <ProfileHeading
          {...{ theme, userId, username, displayOperationsButtons }}
        />
        {requestStatus === "completed" && !requestError && (
          <CollectionsContainer
            {...{
              username,
              theme,
              collections,
              requestError,
              requestStatus,
              openEditForm,
              displayOperationsButtons,
            }}
            deleteCollection={openDeleteForm}
          />
        )}
        {!!requestError && requestStatus !== "loading" && (
          <ErrorAlert {...{ requestError, retryRequest: resetHookState }} />
        )}
        {requestStatus === "loading" && <CenteredSpinner />}
      </UserProfileWrapper>
    </Fragment>
  );
};

export default UserProfile;
