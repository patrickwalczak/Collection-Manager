import "bootstrap/dist/css/bootstrap.min.css";

import TableTemplate from "../Components/MainPage/TableTemplate";

import { FormattedMessage } from "react-intl";

import { useEffect, useState, useCallback, Fragment } from "react";

import { useParams } from "react-router-dom";

import useHttp from "../shared/hooks/useHttp";

const ItemsByTag = () => {
  const [foundItems, setFoundItems] = useState([]);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const { tag } = useParams();

  const getItemsByTag = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/getItemsByTag/${tag}`
      );
      if (!returnedData) throw "";

      setFoundItems(returnedData.items);
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!!foundItems.length || !!requestStatus) return;
    getItemsByTag();
  }, [getItemsByTag, requestStatus]);

  return (
    <Fragment>
      <TableTemplate
        tableHeading={`Items by ${tag} tag`}
        firstHeading={<FormattedMessage id="main-page.item.name" />}
        emptyMessage={<FormattedMessage id="main-page.no.items" />}
        dataList={foundItems}
        requestStatus={requestStatus}
        requestError={requestError}
        resetHookState={resetHookState}
        path="/item"
      />
    </Fragment>
  );
};

export default ItemsByTag;
