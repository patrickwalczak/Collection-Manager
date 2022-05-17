import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import ItemsTable from "./ItemsTable";
import ItemActionController from "./ItemActionController";
import DeleteItemController from "./DeleteItemController";

import { useParams } from "react-router-dom";
import { useEffect, useContext, useState, useCallback, Fragment } from "react";

import AppContext from "../store/app-context";
import useHttp from "../hooks/useHttp";

const CollectionView = () => {
  const [collection, setCollection] = useState(null);
  const [customItemSchema, setCustomItemSchema] = useState(null);
  const [tableHeadings, setHeadings] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [itemID, setItemID] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [addItemFormVisibility, setAddingItemFormVisibility] = useState(false);
  const [editItemFormVisibility, setEditItemFormVisibility] = useState(false);
  const [deleteItemFormVisibility, setDeleteItemFormVisibility] =
    useState(false);
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);

  const { collectionId } = useParams();

  const { userId, userType, token } = useContext(AppContext);

  const canBeChanged =
    !!collection &&
    token &&
    (userType === "admin" || userId === collection?.author);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const handleUpdating = () => setIsBeingUpdated(true);

  const handleClosingAddItemForm = () => setAddingItemFormVisibility(false);
  const handleOpeningAddItemForm = () => setAddingItemFormVisibility(true);

  const handleClosingEditItemForm = () => setEditItemFormVisibility(false);
  const handleOpeningEditItemForm = () => setEditItemFormVisibility(true);

  const handleClosingDeleteItemForm = () => setDeleteItemFormVisibility(false);
  const handleOpeningDeleteItemForm = () => setDeleteItemFormVisibility(true);

  const getCollectionById = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/collection/${collectionId}`
      );
      if (!returnedData) throw "";
      const { collection } = returnedData;
      setCollection(collection);
      setCustomItemSchema(collection.collectionCustomItem);

      if (!collection.items.length) return;
      takeOutTableValues(collection);
    } catch (err) {}
  }, []);

  const takeOutTableValues = (collection) => {
    const itemsObjectsArray = collection.items;
    takeOutHeadings(itemsObjectsArray);
    takeOutItemsValues(itemsObjectsArray);
  };

  const takeOutHeadings = (itemsObjectsArray) => {
    const firstItemInArrayIndex = 0;
    const firstItemInArray = itemsObjectsArray[firstItemInArrayIndex].itemData;
    const fixedHeadings = ["ID", "Name", "Tags"];
    if (firstItemInArray) {
      const optionalFieldsHeadings = Object.entries(firstItemInArray).map(
        ([propertyKey, _]) => propertyKey
      );
      return setHeadings([...fixedHeadings, ...optionalFieldsHeadings]);
    }
    setHeadings(fixedHeadings);
  };

  const takeOutItemsValues = (itemsObjectsArray) => {
    const itemsValuesArray = itemsObjectsArray.map(
      ({ itemData, id, name, tags }) => {
        if (itemData) {
          const itemValuesArray = Object.entries(itemData).map(
            ([_, propertyValue]) => propertyValue
          );
          return { itemValuesArray, id, name, tags };
        }
        return { itemValuesArray: [], id, name, tags };
      }
    );
    setTableValues(itemsValuesArray);
  };

  const openEditForm = (itemId) => {
    if (!itemId) return;
    setItemID(itemId);
    findItemToEdit(itemId);
    handleOpeningEditItemForm();
  };

  const openDeleteForm = (itemId) => {
    if (!itemId) return;
    setItemID(itemId);
    handleOpeningDeleteItemForm();
  };

  const findItemToEdit = (itemId) => {
    // const item = collection.items.find(({ id }) => id === itemId).itemData;
    const item = collection.items.find(({ id }) => id === itemId);
    const itemData = item.itemData;
    if (!item) return;
    setItemData({ ...itemData, name: item.name, tags: item.tags });
  };

  const clearItemStates = () => {
    setItemData(null);
    setItemID(null);
  };

  useEffect(() => {
    if (!collectionId || !!requestStatus) return;
    getCollectionById();
  }, [collectionId, getCollectionById, requestStatus]);

  useEffect(() => {
    if (!isBeingUpdated) return;
    setCollection(null);
    setTableValues(null);
    getCollectionById();
    setIsBeingUpdated(false);
  }, [getCollectionById, isBeingUpdated]);

  return (
    <Fragment>
      {!!customItemSchema && !!collectionId && !!token && (
        <ItemActionController
          heading="Create Item"
          modalVisibilityState={addItemFormVisibility}
          handleCloseModal={handleClosingAddItemForm}
          customItemSchema={customItemSchema}
          itemData={null}
          token={token}
          url={`${collectionId}/createItem`}
          requestMethod="POST"
          clearItemStates={clearItemStates}
          triggerUpdate={handleUpdating}
        />
      )}
      {!!customItemSchema && !!itemID && !!token && (
        <ItemActionController
          heading="Edit Item"
          modalVisibilityState={editItemFormVisibility}
          handleCloseModal={handleClosingEditItemForm}
          customItemSchema={customItemSchema}
          itemData={itemData}
          token={token}
          url={`${itemID}/editItem`}
          requestMethod="PATCH"
          clearItemStates={clearItemStates}
          triggerUpdate={handleUpdating}
        />
      )}

      {!!collection && !!itemID && !!token && (
        <DeleteItemController
          modalVisibilityState={deleteItemFormVisibility}
          handleCloseModal={handleClosingDeleteItemForm}
          itemID={itemID}
          token={token}
          clearItemStates={clearItemStates}
          triggerUpdate={handleUpdating}
        />
      )}

      {canBeChanged && (
        <Button onClick={handleOpeningAddItemForm}>Add item</Button>
      )}

      {requestStatus === "completed" &&
        !requestError &&
        tableHeadings.length !== 0 && (
          <ItemsTable
            tableHeadings={tableHeadings}
            tableValues={tableValues}
            openEditForm={openEditForm}
            openDeleteForm={openDeleteForm}
            canBeChanged={canBeChanged}
          />
        )}
      {requestStatus === "completed" &&
        !requestError &&
        tableHeadings.length === 0 && (
          <h2 className="text-white text-center">THERE ARE NO ITEMS</h2>
        )}
      {!!requestError && requestStatus !== "loading" && (
        <Alert variant="danger">
          <Alert.Heading>{requestError}</Alert.Heading>
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="outline-danger" onClick={resetHookState}>
              Try again
            </Button>
          </div>
        </Alert>
      )}
      {requestStatus === "loading" && <Spinner animation="border" />}
    </Fragment>
  );
};

export default CollectionView;
