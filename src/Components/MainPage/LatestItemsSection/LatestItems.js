import { useEffect, useState, useCallback, Fragment } from "react";

import useHttp from "../../../shared/hooks/useHttp";

import classes from "../CollectionsSection/LargestCollections.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";

import ErrorAlert from "../../../common/UI/ErrorAlert";
import LatestItemsList from "./LatestItemsList";

import classes2 from "./LatestItems.module.css";

const LatestItemsController = () => {
  const [latestItems, setLatestItems] = useState([]);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const getLatestItems = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/getLatestItems`
      );
      if (!returnedData) throw "";
      const { latestItems } = returnedData;

      setLatestItems(latestItems);
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!!latestItems.length || !!requestStatus) return;
    getLatestItems();
  }, [getLatestItems, requestStatus]);

  return (
    <Row
      className={
        `col-12 mb-5 justify-content-center justify-content-sm-around justify-content-md-start flex-wrap rounded themeClass gap-3 ` +
        classes.largestCollectionsContainer
      }
    >
      <h2 className={`text-left mb-5 ${classes["sectionTitle"]}`}>
        LATEST ITEMS
      </h2>

      <LatestItemsList {...{ latestItems }} />

      {!!requestError && (
        <ErrorAlert {...{ requestError, retryRequest: resetHookState }} />
      )}
    </Row>
  );
};
export default LatestItemsController;
