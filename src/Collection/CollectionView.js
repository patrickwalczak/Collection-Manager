import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Item from "./Item";
import Heading from "./Heading";

import { useParams } from "react-router-dom";
import { useEffect, useContext, useState, useCallback, Fragment } from "react";
import AppContext from "../store/app-context";
import useHttp from "../hooks/useHttp";
import AddItem from "./AddItem";

const CollectionView = () => {
  const [collectionData, setCollectionData] = useState(null);
  const [customItemBlueprint, setCustomItemBluePrint] = useState(null);

  const { collectionId } = useParams();

  const { userId, userType, token } = useContext(AppContext);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const [modalVisibilityState, setModalVisibility] = useState(false);

  const handleCloseModal = () => setModalVisibility(false);
  const handleShowModal = () => setModalVisibility(true);

  const getCollectionById = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/collection/${collectionId}`
      );
      if (!returnedData) throw "";
      const { collection } = returnedData;
      setCustomItemBluePrint(collection.collectionCustomItem);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!collectionId) return;
    getCollectionById();
  }, [userId, getCollectionById]);

  return (
    <Fragment>
      {!!customItemBlueprint && (
        <AddItem
          modalVisibilityState={modalVisibilityState}
          handleCloseModal={handleCloseModal}
          customItemProperties={customItemBlueprint}
          collectionID={collectionId}
          loggedUserId={userId}
          token={token}
        />
      )}
      <Button onClick={handleShowModal}>Add item</Button>
      <Table variant="dark" responsive className="mt-5">
        <thead>
          <tr>
            <Heading></Heading>
          </tr>
        </thead>
        <tbody>
          <Item></Item>
        </tbody>
      </Table>
    </Fragment>
  );
};

export default CollectionView;
