import TableTemplate from "./TableTemplate";

import { useEffect, useState, useCallback, Fragment } from "react";

import useHttp from "../hooks/useHttp";

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
    <Fragment>
      <TableTemplate
        tableHeading="Latest items"
        firstHeading="Item name"
        dataList={latestItems}
        requestStatus={requestStatus}
      />
    </Fragment>
  );
};
export default LatestItemsController;
