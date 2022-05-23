import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";

import ErrorAlert from "../../common/UI/ErrorAlert";
import CenteredSpinner from "../../common/UI/CenteredSpinner";

import { TagCloud } from "react-tagcloud";

import { useEffect, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import useHttp from "../../hooks/useHttp";

const Cloud = () => {
  const [cloudData, setCloudData] = useState([]);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const navigate = useNavigate();

  const getCloudData = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/getCloudData`
      );
      if (!returnedData) throw "";
      const { tags } = returnedData;
      convertTagsToCloudData(tags);
    } catch (err) {}
  }, []);

  const convertTagsToCloudData = (tags) => {
    const initialData = [];
    for (const tag of tags) {
      const foundTag = initialData.find(
        (cloudTagObj) => cloudTagObj?.value === tag
      );
      if (!foundTag) initialData.push({ value: tag, count: 1 });
      else {
        const foundTagIndex = initialData.findIndex(
          ({ value }) => value === tag
        );
        initialData[foundTagIndex] = {
          ...initialData[foundTagIndex],
          count: initialData[foundTagIndex].count + 1,
        };
      }
    }
    setCloudData(initialData);
  };

  const handleClickedTag = ({ value }) => {
    navigate(`/foundItems/${value}`);
  };

  useEffect(() => {
    if (!!cloudData.length || !!requestStatus) return;
    getCloudData();
  }, [getCloudData, requestStatus]);

  return (
    <Row
      style={{ minHeight: "20rem", minWidth: "440px" }}
      className="position-relative themeClass shadow rounded col-11 p-4 d-flex align-items-center"
    >
      {!cloudData.length && (
        <div className="p-4">
          <h5 className="fw-normal text-center">
            No item found, cloud cannot be loaded
          </h5>
        </div>
      )}
      <TagCloud
        minSize={40}
        maxSize={120}
        tags={cloudData}
        onClick={handleClickedTag}
      />

      {!!requestError && (
        <ErrorAlert {...{ requestError, retryRequest: resetHookState }} />
      )}
      {requestStatus === "loading" && <CenteredSpinner />}
    </Row>
  );
};

export default Cloud;
