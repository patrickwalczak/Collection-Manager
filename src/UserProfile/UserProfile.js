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

  useEffect(() => {
    if (!userId) return;
    getCollectionsByUserId();
  }, [userId, getCollectionsByUserId]);

  const isUserOrAdmin =
    !!token && (userType === "admin" || userId === loggedUserId);

  return (
    <Fragment>
      <EditCollection
        modalVisibilityState={modalVisibilityState}
        handleCloseModal={handleCloseModal}
        collectionData={collectionData}
        collectionID={collectionID}
      />
      <UserProfileWrapper>
        <ProfileHeader isUserOrAdmin={isUserOrAdmin} />
        <CollectionsContainer
          collections={collections}
          requestError={requestError}
          requestStatus={requestStatus}
          getCollectionId={getCollectionId}
          openEditForm={openEditForm}
        />
      </UserProfileWrapper>
    </Fragment>
  );
};

export default UserProfile;
