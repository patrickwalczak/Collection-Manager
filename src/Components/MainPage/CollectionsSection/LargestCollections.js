import { useEffect, useState, useCallback } from "react";

import useHttp from "../../../shared/hooks/useHttp";

import classes from "./LargestCollections.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";

import LargestCollectionsList from "./LargestCollectionsList";

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
        `col-12 justify-content-center justify-content-sm-around justify-content-md-between flex-wrap p-4 bg-white ` +
        classes.largestCollectionsContainer
      }
    >
      {!requestError && (
        <LargestCollectionsList
          {...{ largestCollections, requestStatus, requestError }}
        />
      )}
    </Row>
  );
};
export default LargestCollections;
