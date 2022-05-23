import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";

import ErrorAlert from "../../UI/ErrorAlert";
import CenteredSpinner from "../../UI/CenteredSpinner";

import { useEffect, useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import useHttp from "../../hooks/useHttp";

const ItemsByTag = () => {
  //   const [cloudData, setCloudData] = useState([]);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const navigate = useNavigate();

  const getItemsByTag = useCallback(async () => {
    // try {
    //   const returnedData = await sendRequest(
    //     `${process.env.REACT_APP_BACKEND_URL}`
    //   );
    //   if (!returnedData) throw "";
    // } catch (err) {}
  }, []);

  useEffect(() => {
    if (!!requestStatus) return;
    getItemsByTag();
  }, [getItemsByTag, requestStatus]);

  return (
    <Row className="mb-5 col-12 rounded p-0 p-lg-3">
      <Table
        style={{ minWidth: "590px" }}
        responsive
        className="scrollBar reset"
      >
        <thead className="themeClass shadow text-uppercase mb-4 rounded">
          <tr>
            <th>
              <h2 className="text-center p-3 pb-0 fs-1">{tableHeading}</h2>
            </th>
          </tr>
          <tr className="shadow d-flex col-12 fs-6 fw-bolder">
            <th className="col-3 text-center">{firstHeading}</th>
            <th className="col-4 text-center">
              <FormattedMessage id="collection.name" />
            </th>
            <th className="col-3 text-center">
              <FormattedMessage id="author" />
            </th>
            <th className="col-2 text-center">
              <FormattedMessage id="link" />
            </th>
          </tr>
        </thead>
        <tbody
          className="position-relative"
          style={{ borderTop: "none", cursor: "pointer", minHeight: "8rem" }}
        >
          {content}
        </tbody>
      </Table>
      {!!requestError && (
        <ErrorAlert {...{ requestError, retryRequest: resetHookState }} />
      )}
      {requestStatus === "loading" && <CenteredSpinner />}
    </Row>
  );
};

export default ItemsByTag;
