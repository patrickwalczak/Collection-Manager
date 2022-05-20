import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import Comments from "./Comments";
import ItemData from "./ItemData";
import LikeItem from "./LikeItem";

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

  return (
    <Fragment>
      {!!collectionItem && (
        <Container className="d-flex align-items-center flex-column col-10 col-sm-7 col-md-11 col-lg-9 col-xl-8 col-xll-7 mx-auto pb-3 mt-4 p-4">
          <Row className="bg-dark mb-2 col-12 text-white pt-5 pb-5 px-4">
            <h1 className="border-bottom pb-4 px-0">{collectionItem.name}</h1>
            <div className="d-flex gap-2 my-3">
              <span className="text-secondary fs-5">Tags</span>
              {collectionItem.tags.map((tag, index) => (
                <Badge className="bg-light text-dark fs-6" key={index}>
                  {tag}
                </Badge>
              ))}
            </div>
            {!!collectionItem && collectionItem.itemData && (
              <ItemData itemData={collectionItem.itemData} />
            )}
            <LikeItem
              itemId={itemId}
              isLikedByLoggedUser={isLikedByLoggedUser}
              token={token}
            />
          </Row>
          <Comments itemComments={collectionItem.comments} />
        </Container>
      )}
    </Fragment>
  );
};
export default ItemView;
