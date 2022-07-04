import { useEffect, useState, useCallback } from "react";

import useHttp from "../../../shared/hooks/useHttp";

import classes from "./LargestCollections.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";

import LargestCollectionsList from "./LargestCollectionsList";
import ErrorAlert from "../../../common/UI/ErrorAlert";

const LargestCollections = () => {
  const [largestCollections, setLargestCollections] = useState([]);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const getLargestCollections = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/collections/getLargestCollections`
      );
      if (!returnedData) throw "";
      const { largestCollections } = returnedData;

      setLargestCollections(largestCollections);
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!!largestCollections.length || !!requestStatus) return;
    getLargestCollections();
  }, [getLargestCollections, requestStatus]);

  return (
    <Row
      className={
        `col-12 justify-content-center justify-content-sm-around justify-content-md-start flex-wrap rounded themeClass gap-2 gap-lg-4 ` +
        classes.largestCollectionsContainer
      }
    >
      <h2 className={`text-left mb-5 ${classes["sectionTitle"]}`}>
        LARGEST COLLECTIONS
      </h2>
      {!requestError && (
        <LargestCollectionsList
          {...{ largestCollections, requestStatus, requestError }}
        />
      )}
      {!!requestError && (
        <ErrorAlert {...{ requestError, retryRequest: resetHookState }} />
      )}
    </Row>
  );
};
export default LargestCollections;
