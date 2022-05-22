import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";

import Comments from "./Comments";
import ItemData from "./ItemData";
import LikeItem from "./LikeItem";
import ItemViewWrapper from "./ItemViewWrapper";
import ErrorAlert from "../UI/ErrorAlert";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { useEffect, useContext, useState, useCallback, Fragment } from "react";
import { useParams, Link } from "react-router-dom";

import AppContext from "../store/app-context";

import useHttp from "../hooks/useHttp";
import CenteredSpinner from "../UI/CenteredSpinner";

const ItemView = () => {
  const [collectionItem, setCollectionItem] = useState(null);

  const { itemId } = useParams();

  const { userId, token, theme } = useContext(AppContext);

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
      <Row
        data-theme={theme}
        className="themeClass rounded shadow position-relative mb-2 col-12 pt-3 pb-5 px-4"
      >
        {displayComponents && (
          <Fragment>
            <div className="d-flex mb-4 px-0">
              <Link
                className="btn px-0"
                to={`/collection/${collectionItem?.belongsToCollection}`}
              >
                <AiOutlineArrowLeft /> Back to collection
              </Link>
            </div>
            <h1 className="themeClass border-bottom pb-4 px-0">
              {collectionItem?.name}
            </h1>
            <div className="d-flex gap-2 my-3">
              <span className="text-secondary fs-5">Tags</span>
              {collectionItem?.tags.map((tag, index) => (
                <Badge
                  className={`${
                    theme === "light"
                      ? "bg-dark text-light"
                      : "bg-light text-dark"
                  }   fs-6`}
                  key={index}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {collectionItem?.itemData && (
              <ItemData itemData={collectionItem.itemData} />
            )}
            <LikeItem
              theme={theme}
              itemId={itemId}
              isLikedByLoggedUser={isLikedByLoggedUser}
              token={token}
            />
          </Fragment>
        )}
        {requestStatus === "loading" && <CenteredSpinner />}
        {requestStatus === "completed" && !!requestError && (
          <ErrorAlert
            requestError={requestError}
            retryRequest={resetHookState}
          />
        )}
      </Row>
      <Comments theme={theme} itemComments={collectionItem?.comments} />
    </ItemViewWrapper>
  );
};
export default ItemView;
