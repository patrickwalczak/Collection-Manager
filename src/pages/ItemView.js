import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";

import Comments from "../Components/ItemView/Comments";
import ItemData from "../Components/ItemView/ItemData";
import LikeItem from "../Components/ItemView/LikeItem";
import ItemViewWrapper from "../Components/ItemView/ItemViewWrapper";
import ErrorAlert from "../common/UI/ErrorAlert";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { useEffect, useContext, useState, useCallback, Fragment } from "react";
import { useParams, Link } from "react-router-dom";

import AppContext from "../shared/context/app-context";

import useHttp from "../hooks/useHttp";
import CenteredSpinner from "../common/UI/CenteredSpinner";

const ItemView = () => {
  const [collectionItem, setCollectionItem] = useState(null);

  const { itemId } = useParams();

  const { userId, token, theme } = useContext(AppContext);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const isLikedByLoggedUser = !!collectionItem?.likes.find(
    (id) => id === userId
  )
    ? true
    : false;

  const displayComponents =
    !requestError && requestStatus === "completed" && !!collectionItem;

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

  return (
    <ItemViewWrapper>
      <Row
        data-theme={theme}
        className="themeClass rounded shadow position-relative mb-2 col-12 pt-3 pb-2 px-4"
      >
        {displayComponents && (
          <Fragment>
            <div className="d-flex mb-4 px-0">
              <Link
                className="btn themeClass btn-light"
                to={`/collection/${collectionItem?.belongsToCollection}`}
              >
                <AiOutlineArrowLeft /> Back to collection
              </Link>
            </div>
            <h1 className="themeClass border-bottom pb-4 px-0">
              {collectionItem?.name}
            </h1>
            <div className="d-flex gap-2 my-4">
              <span className="text-secondary fs-5">Tags</span>
              {collectionItem?.tags.map((tag, index) => (
                <Badge
                  className={`${
                    theme === "light"
                      ? "bg-dark text-light mx-1"
                      : "bg-light text-dark mx-1"
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
      {!!collectionItem && (
        <Comments
          theme={theme}
          itemId={itemId}
          itemComments={collectionItem?.comments}
        />
      )}
    </ItemViewWrapper>
  );
};
export default ItemView;
