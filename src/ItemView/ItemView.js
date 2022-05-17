import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import { useParams, Link } from "react-router-dom";
import { useEffect, useContext, useState, useCallback, Fragment } from "react";

import AppContext from "../store/app-context";
import useHttp from "../hooks/useHttp";

import Comments from "./Comments";
import ItemData from "./ItemData";

const ItemView = () => {
  const [collectionItem, setCollectionItem] = useState(null);
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);

  const { itemId } = useParams();

  const { userId, userType, token } = useContext(AppContext);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const handleUpdating = () => setIsBeingUpdated(true);

  const getItemById = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/item/${itemId}`
      );
      if (!returnedData) throw "";
      const { item } = returnedData;
      setCollectionItem(item);
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!itemId || !!requestStatus) return;
    getItemById();
  }, [itemId, getItemById, requestStatus]);

  useEffect(() => {
    if (!isBeingUpdated) return;
    setCollectionItem(null);
    getItemById();
    setIsBeingUpdated(false);
  }, [getItemById, isBeingUpdated]);

  return (
    <Fragment>
      {!!collectionItem && (
        <Container
          style={{ minHeight: "60vh" }}
          className="d-flex align-items-center flex-column rounded bg-white col-10 col-sm-7 col-md-11 col-lg-9 col-xl-8 col-xll-7 mx-auto pb-3 mt-4 p-4"
        >
          <Row className="mb-5 rounded col-12 ">
            <Col className="rounded p-2 p-md-3 p-xl-2 text-center text-white bg-dark">
              <h1>Item name</h1>
              <div className="d-flex">
                <span>Tags</span>
                {collectionItem.tags.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </div>
            </Col>
          </Row>
          {!!collectionItem && collectionItem.itemData && (
            <ItemData itemData={collectionItem.itemData} />
          )}
          <div className="col-12 d-grid justify-content-start align-items-start">
            <Button variant="outline-primary">Like</Button>
          </div>

          <Comments />
        </Container>
      )}
      {/* {!!requestError && requestStatus !== "loading" && (
        <Alert variant="danger">
          <Alert.Heading>{requestError}</Alert.Heading>
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="outline-danger" onClick={resetHookState}>
              Try again
            </Button>
          </div>
        </Alert>
      )}
      {requestStatus === "loading" && <Spinner animation="border" />} */}
    </Fragment>
  );
};
export default ItemView;
