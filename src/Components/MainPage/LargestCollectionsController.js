import TableTemplate from "./TableTemplate";

import { useEffect, useState, useCallback, Fragment } from "react";

import useHttp from "../../shared/hooks/useHttp";

import { FormattedMessage } from "react-intl";

const LargestCollectionsController = () => {
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
    <Fragment>
      <TableTemplate
        tableHeading={<FormattedMessage id="main-page.largest.collections" />}
        firstHeading={<FormattedMessage id="main-page.number.of.items" />}
        emptyMessage={<FormattedMessage id="main-page.no.collections" />}
        dataList={largestCollections}
        requestStatus={requestStatus}
        requestError={requestError}
        resetHookState={resetHookState}
        path="/collection"
      />
    </Fragment>
  );
};
export default LargestCollectionsController;
