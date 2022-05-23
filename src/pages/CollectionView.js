import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";

import ItemsTable from "../Components/Collection/ItemsTable";
import ItemActionController from "../Components/Collection/ItemActionController";
import DeleteController from "../common/UI/DeleteController";
import ErrorAlert from "../common/UI/ErrorAlert";

import { BsSortUp } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";

import { useParams, Link } from "react-router-dom";
import { useEffect, useContext, useState, useCallback, Fragment } from "react";

import AppContext from "../shared/context/app-context";
import useHttp from "../shared/hooks/useHttp";

import { CSVLink } from "react-csv";

const CollectionView = () => {
  const [collection, setCollection] = useState(null);
  const [tableHeadings, setHeadings] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [itemID, setItemID] = useState(null);
  const [operationData, setOperationData] = useState(null);
  const [itemOperationsFormVisibility, setItemOperationsFormVisibility] =
    useState(false);
  const [deleteItemFormVisibility, setDeleteItemFormVisibility] =
    useState(false);
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);
  const [sortedTable, setSortedTable] = useState([]);
  const [isSorted, setSorted] = useState(false);

  const { collectionId } = useParams();

  const { userId, userType, token, theme } = useContext(AppContext);

  const canBeChanged =
    !!collection &&
    token &&
    (userType === "admin" || userId === collection?.author);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const operationButtonStyle = `btn-${theme} px-1 py-0 mx-1 fs-4 fw-bolder`;

  const handleUpdating = () => setIsBeingUpdated(true);

  const handleClosingItemOperationsForm = () =>
    setItemOperationsFormVisibility(false);
  const handleOpeningItemOperationsForm = () =>
    setItemOperationsFormVisibility(true);

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

      takeOutTableValues(collection);
    } catch (err) {}
  }, []);

  const takeOutTableValues = (collection) => {
    const itemsObjectsArray = collection?.items;
    if (!itemsObjectsArray.length) {
      setHeadings([]);
      return setTableValues([]);
    }
    takeOutHeadings(itemsObjectsArray);
    takeOutItemsValues(itemsObjectsArray);
  };

  const takeOutHeadings = (itemsObjectsArray) => {
    const firstItemInArrayIndex = 0;
    const firstItemInArray = itemsObjectsArray[firstItemInArrayIndex]?.itemData;
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

  const openDeleteForm = (itemId) => {
    if (!itemId) return;
    setItemID(itemId);
    handleOpeningDeleteItemForm();
  };

  const clearItemStates = () => {
    setOperationData(null);
    setItemID(null);
    resetSortedTable();
  };

  const sortTable = (e) => {
    const chosenProperty = e.target.dataset.value;
    const chosenPropertyIndex = e.target.dataset.index;
    const endIndexOfFixedProperties = 2;

    if (!chosenProperty) return;

    if (chosenProperty === "reset") return resetSortedTable();

    const tableValuesCopy = tableValues.slice();

    if (chosenPropertyIndex <= endIndexOfFixedProperties)
      sortFixedFields(tableValuesCopy, chosenProperty);
    if (chosenPropertyIndex > endIndexOfFixedProperties)
      sortCustomFields(tableValuesCopy, chosenPropertyIndex);
  };

  const initSortedTable = (sortedTable) => {
    setSorted(true);
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

  const openAddItemForm = () => {
    setOperationData({
      url: `${collectionId}/createItem`,
      requestMethod: "POST",
      heading: "Create Item",
      itemData: null,
    });
    handleOpeningItemOperationsForm();
  };

  const openEditItemForm = (itemId) => {
    if (!itemId) return;
    const foundItem = findItem(itemId);
    setOperationData({
      url: `${itemId}/editItem`,
      requestMethod: "PATCH",
      heading: "Edit Item",
      itemData: foundItem,
    });
    handleOpeningItemOperationsForm();
  };

  const findItem = (itemId) => {
    setItemID(itemId);
    const itemToEdit = findItemToEdit(itemId);
    return itemToEdit;
  };

  const findItemToEdit = (itemId) => {
    const item = collection.items.find(({ id }) => id === itemId);
    const itemData = item?.itemData;
    if (!item) return;
    const itemToEdit = { ...itemData, name: item.name, tags: item.tags };
    return itemToEdit;
  };

  useEffect(() => {
    if (!collectionId || !!requestStatus) return;
    getCollectionById();
  }, [collectionId, getCollectionById, requestStatus]);

  useEffect(() => {
    if (!isBeingUpdated) return;
    getCollectionById();
    setIsBeingUpdated(false);
  }, [getCollectionById, isBeingUpdated]);

  return (
    <Fragment>
      {!!collection && !!token && !!operationData && (
        <ItemActionController
          modalVisibilityState={itemOperationsFormVisibility}
          handleCloseModal={handleClosingItemOperationsForm}
          customItemSchema={collection.collectionCustomItem}
          token={token}
          clearItemStates={clearItemStates}
          triggerUpdate={handleUpdating}
          {...operationData}
        />
      )}

      {!!collection && !!itemID && !!token && (
        <DeleteController
          modalVisibilityState={deleteItemFormVisibility}
          handleCloseModal={handleClosingDeleteItemForm}
          urlEndPath={`items/${itemID}/deleteItem`}
          token={token}
          clearParentStates={clearItemStates}
          triggerParentUpdate={handleUpdating}
          modalHeading="Delete Item"
        />
      )}

      <div className="mt-4 d-flex justify-content-between gap-2 pb-1">
        <div>
          <Link
            className="mx-2 btn themeClass btn-light"
            to={`/user/${collection?.author}`}
          >
            <AiOutlineArrowLeft /> Back to user profile
          </Link>
        </div>

        <div>
          {!!tableValues.length && (
            <CSVLink
              title="Download items"
              className={`btn mx-2 ${
                theme === "dark" ? "text-white btn-dark" : "btn-light text-dark"
              }`}
              data={tableValues}
            >
              <AiOutlineDownload />
            </CSVLink>
          )}
          {canBeChanged && (
            <Button
              title="Create Item"
              className={operationButtonStyle}
              onClick={openAddItemForm}
            >
              <AiOutlineAppstoreAdd />
            </Button>
          )}
          {!!collection?.items.length && (
            <DropdownButton
              as={ButtonGroup}
              id={"sortDropdown"}
              variant={theme}
              title="Sort"
              className={operationButtonStyle}
              title={<BsSortUp />}
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
          )}
        </div>
      </div>

      {requestStatus === "completed" &&
        !requestError &&
        tableHeadings.length !== 0 && (
          <ItemsTable
            theme={theme}
            tableHeadings={tableHeadings}
            tableValues={tableValues}
            isSorted={isSorted}
            sortedTable={sortedTable}
            openEditForm={openEditItemForm}
            openDeleteForm={openDeleteForm}
            canBeChanged={canBeChanged}
          />
        )}
      {requestStatus === "completed" &&
        !requestError &&
        tableHeadings.length === 0 && (
          <div className="themeClass p-5 mt-2">
            <h2 className="text-center">THIS COLLECTION IS EMPTY</h2>
          </div>
        )}
      {!!requestError && requestStatus !== "loading" && (
        <ErrorAlert {...{ requestError, retryRequest: resetHookState }} />
      )}
      {requestStatus === "loading" && <Spinner animation="border" />}
    </Fragment>
  );
};

export default CollectionView;
