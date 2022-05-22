import "bootstrap/dist/css/bootstrap.min.css";
import ErrorAlert from "../UI/ErrorAlert";
import CenteredSpinner from "../UI/CenteredSpinner";

import CollectionsContainer from "./CollectionsContainer";
import UserProfileWrapper from "./UserProfileWrapper";
import EditCollection from "./EditCollection";
import DeleteController from "../UI/DeleteController";

import { AiFillFileAdd } from "react-icons/ai";

import { useParams, Link } from "react-router-dom";
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
        <div className="border-bottom d-flex justify-content-between mb-4">
          <h2
            className={`fw-normal fs-1 ${
              theme === "dark" ? "text-white" : "text-dark"
            }`}
          >
            {username}
          </h2>

          <Link
            title="Create Collection"
            to={`/${userId}/newcollection`}
            className={`btn btn-${theme} px-1 py-0 pb-2 fs-2`}
          >
            <AiFillFileAdd />
          </Link>
        </div>

        {requestStatus === "completed" && !requestError && (
          <CollectionsContainer
            {...{
              username,
              theme,
              collections,
              requestError,
              requestStatus,
              getCollectionId,
              openEditForm,
              displayOperationsButtons,
            }}
            deleteCollection={openDeleteForm}
          />
        )}
        {!!requestError && requestStatus !== "loading" && (
          <ErrorAlert {...{ requestError, retryRequest: resetHookState }} />
        )}
        {requestStatus === "loading" && (
          <div className="position-absolute start-50 top-50">
            <CenteredSpinner
              animation="border"
              variant={theme === "dark" ? "light" : "dark"}
            />
          </div>
        )}
      </UserProfileWrapper>
    </Fragment>
  );
};

export default UserProfile;
