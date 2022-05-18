import TableTemplate from "./TableTemplate";

import { useEffect, useState, useCallback, Fragment } from "react";

import useHttp from "../hooks/useHttp";

const LargestCollectionsController = () => {
  const [largestCollections, setLargestCollections] = useState([]);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const getLargestCollections = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/collections/getLargestCollections`
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
    <Fragment>
      <TableTemplate
        tableHeading="Largest collections"
        firstHeading="Number of items"
        dataList={largestCollections}
        requestStatus={requestStatus}
      />
    </Fragment>
  );
};
export default LargestCollectionsController;
