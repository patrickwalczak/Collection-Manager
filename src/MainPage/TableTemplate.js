import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { Link } from "react-router-dom";

import { FormattedMessage } from "react-intl";

const TableTemplate = ({
  tableHeading,
  firstHeading,
  dataList,
  requestStatus,
  path,
}) => {
  let content;

  content = (
    <tr className="position-absolute top-50 start-50 translate-middle">
      <th>
        <Spinner animation="border" variant="light" />
      </th>
    </tr>
  );

  if (!dataList.length && requestStatus === "completed") {
    content = (
      <tr className="themeClass shadow d-flex col-12 fs-5 rounded border p-5 mb-3">
        <th className="col-12 text-center text-break text-uppercase">
          <FormattedMessage id="main-page.no.item.found" />
        </th>
      </tr>
    );
  }

  if (dataList.length && requestStatus === "completed") {
    content = dataList.map(
      ({ id, firstHeading, collectionName, author }, index) => (
        <tr
          key={index}
          className="themeClass shadow d-flex col-12 fs-5 rounded border p-1 mb-3"
        >
          <th className="col-3 text-center text-break">{firstHeading}</th>
          <th className="col-4 text-center text-break">{collectionName}</th>
          <th className="col-3 text-center text-break">{author}</th>
          <th className="col-2 text-center text-break">
            <Link to={`${path}/${id}`} className="btn btn-success py-0">
              <FormattedMessage id="open.item" />
            </Link>
          </th>
        </tr>
      )
    );
  }

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
    </Row>
  );
};
export default TableTemplate;
