import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

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
  const [sortedTable, setSortedTable] = useState([]);
  const [isSorted, setSorted] = useState(false);

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
        `${process.env.REACT_APP_BACKEND_URL}/collections/collection/${collectionId}`
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
    const item = collection.items.find(({ id }) => id === itemId);
    const itemData = item?.itemData;
    if (!item) return;
    setItemData({ ...itemData, name: item.name, tags: item.tags });
  };

  const clearItemStates = () => {
    setItemData(null);
    setItemID(null);
  };

  const sortTable = (e) => {
    const chosenProperty = e.target.dataset.value;
    const chosenPropertyIndex = e.target.dataset.index;
    const endIndexOfFixedProperties = 2;

    if (!chosenProperty) return;

    if (chosenProperty === "reset") return resetSortedTable();

    console.log(sortedTable);
    const tableValuesCopy = !!sortedTable?.length
      ? sortedTable
      : tableValues.slice();
    console.log(tableValuesCopy);

    if (chosenPropertyIndex <= endIndexOfFixedProperties)
      sortFixedFields(tableValuesCopy, chosenProperty);
    if (chosenPropertyIndex > endIndexOfFixedProperties)
      sortCustomFields(tableValuesCopy, chosenPropertyIndex);
  };

  const initSortedTable = (sortedTable) => {
    setSorted(!isSorted);
    setSortedTable(sortedTable);
  };

  const resetSortedTable = () => {
    setSorted(false);
    setSortedTable([]);
  };

  const sortFixedFields = (tableValuesCopy, chosenProperty) => {
    tableValuesCopy.sort((a, b) => {
      const valueA = a[chosenProperty].toUpperCase();
      const valueB = b[chosenProperty].toUpperCase();
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    initSortedTable(tableValuesCopy);
  };

  const sortCustomFields = (tableValuesCopy, chosenPropertyIndex) => {
    const startPointOfCustomFieldsProperties = 3;
    const propertyIndex =
      chosenPropertyIndex - startPointOfCustomFieldsProperties;
    tableValuesCopy.sort((a, b) => {
      const valueA = a.itemValuesArray[propertyIndex].toUpperCase();
      const valueB = b.itemValuesArray[propertyIndex].toUpperCase();
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    initSortedTable(tableValuesCopy);
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

      <DropdownButton
        as={ButtonGroup}
        id={"sortDropdown"}
        variant="primary"
        title={"Sort By"}
        onClick={sortTable}
      >
        {tableHeadings.map((tableHeading, index) => {
          if (tableHeading === "Tags") return;
          return (
            <Dropdown.Item
              key={index}
              data-index={index}
              data-value={tableHeading.toLowerCase()}
            >
              {tableHeading}
            </Dropdown.Item>
          );
        })}
        <Dropdown.Divider />
        <Dropdown.Item data-value="reset">Reset</Dropdown.Item>
      </DropdownButton>

      {requestStatus === "completed" &&
        !requestError &&
        tableHeadings.length !== 0 && (
          <ItemsTable
            tableHeadings={tableHeadings}
            tableValues={tableValues}
            isSorted={isSorted}
            sortedTable={sortedTable}
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
