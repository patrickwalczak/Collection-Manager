import TableTemplate from "./TableTemplate";

import { useEffect, useState, useCallback, Fragment } from "react";

import useHttp from "../hooks/useHttp";

import { FormattedMessage } from "react-intl";

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
        tableHeading={<FormattedMessage id="main-page.latest.heading" />}
        firstHeading={<FormattedMessage id="main-page.item.name" />}
        emptyMessage={<FormattedMessage id="main-page.no.items" />}
        dataList={latestItems}
        requestStatus={requestStatus}
        path="/item"
      />
    </Fragment>
  );
};
export default LatestItemsController;
