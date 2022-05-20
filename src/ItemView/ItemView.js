import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";

import Comments from "./Comments";
import ItemData from "./ItemData";
import LikeItem from "./LikeItem";
import ItemViewWrapper from "./ItemViewWrapper";

import { useEffect, useContext, useState, useCallback, Fragment } from "react";
import { useParams, Link } from "react-router-dom";

import AppContext from "../store/app-context";
import useHttp from "../hooks/useHttp";

const ItemView = () => {
  const [collectionItem, setCollectionItem] = useState(null);

  const { itemId } = useParams();

  const { userId, token } = useContext(AppContext);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const getItemById = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/item/${itemId}`
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

  const isLikedByLoggedUser = !!collectionItem?.likes.find(
    (id) => id === userId
  )
    ? true
    : false;

  const displayComponents =
    !requestError && requestStatus === "completed" && !!collectionItem;

  return (
    <ItemViewWrapper>
      <Row className="position-relative bg-dark mb-2 col-12 text-white pt-3 pb-5 px-4">
        {displayComponents && (
          <Fragment>
            <div className="d-flex mb-4 px-0">
              <Link
                className="btn text-light px-0"
                to={`/collection/${collectionItem?.belongsToCollection}`}
              >
                Collection
              </Link>
            </div>
            <h1 className="border-bottom pb-4 px-0">{collectionItem?.name}</h1>
            <div className="d-flex gap-2 my-3">
              <span className="text-secondary fs-5">Tags</span>
              {collectionItem?.tags.map((tag, index) => (
                <Badge className="bg-light text-dark fs-6" key={index}>
                  {tag}
                </Badge>
              ))}
            </div>
            {collectionItem?.itemData && (
              <ItemData itemData={collectionItem.itemData} />
            )}
            <LikeItem
              itemId={itemId}
              isLikedByLoggedUser={isLikedByLoggedUser}
              token={token}
            />
          </Fragment>
        )}
        {requestStatus === "loading" && (
          <div className="position-absolute top-50 start-100 translate-middle">
            <Spinner animation="border" />
          </div>
        )}
        {requestStatus === "completed" && !!requestError && (
          <Alert variant="danger">
            <Alert.Heading>{requestError}</Alert.Heading>
            <div className="mt-3 d-flex justify-content-end">
              <Button variant="outline-danger" onClick={resetHookState}>
                Try again
              </Button>
            </div>
          </Alert>
        )}
      </Row>
      <Comments itemComments={collectionItem?.comments} />
    </ItemViewWrapper>
  );
};
export default ItemView;
