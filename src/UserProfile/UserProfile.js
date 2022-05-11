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

const UserProfile = () => {
  const [collections, setCollections] = useState([]);
  const [collectionID, setCollectionID] = useState(null);
  const [collectionData, setCollectionData] = useState(null);
  const [modalVisibilityState, setModalVisibility] = useState(false);

  const { userId: loggedUserId, userType, token } = useContext(AppContext);

  const { userId } = useParams();

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const {
    requestError: deleteError,
    requestStatus: deleteStatus,
    sendRequest: sendDeleteRequest,
    resetHookState: resetDeleteHookState,
  } = useHttp();

  const getCollectionsByUserId = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/user/${userId}`
      );
      if (!returnedData) throw "";
      const { collections } = returnedData;

      setCollections(collections);
    } catch (err) {
      setCollections([]);
    }
  }, []);

  const handleCloseModal = () => setModalVisibility(false);
  const handleShowModal = () => setModalVisibility(true);

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

  const deleteCollection = async (e) => {
    const collectionID = getCollectionId(e);
    try {
      console.log(collectionID);
      const returnedData = await sendDeleteRequest(
        `http://localhost:5000/api/collections/${collectionID}/deleteCollection`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!returnedData) throw "";
    } catch (err) {}
  };

  useEffect(() => {
    if (!userId || !!requestStatus) return;
    getCollectionsByUserId();
  }, [userId, getCollectionsByUserId, requestStatus]);

  const displayOperationsButtons =
    !!token && (userType === "admin" || userId === loggedUserId);

  return (
    <Fragment>
      {!!collectionID && (
        <EditCollection
          modalVisibilityState={modalVisibilityState}
          handleCloseModal={handleCloseModal}
          collectionData={collectionData}
          collectionID={collectionID}
          setCollections={setCollections}
          loggedUserId={loggedUserId}
        />
      )}
      <UserProfileWrapper>
        <ProfileHeader displayOperationsButtons={displayOperationsButtons} />
        {requestStatus === "completed" && !requestError && (
          <CollectionsContainer
            collections={collections}
            requestError={requestError}
            requestStatus={requestStatus}
            getCollectionId={getCollectionId}
            openEditForm={openEditForm}
            deleteCollection={deleteCollection}
            displayOperationsButtons={displayOperationsButtons}
          />
        )}
        {!!requestError && requestStatus === "completed" && (
          <Alert variant="danger" onClose={resetHookState} dismissible>
            <Alert.Heading>{requestError}</Alert.Heading>
          </Alert>
        )}
        {requestStatus === "loading" && <Spinner animation="border" />}
      </UserProfileWrapper>
    </Fragment>
  );
};

export default UserProfile;
