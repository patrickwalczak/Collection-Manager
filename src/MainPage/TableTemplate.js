import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { Link } from "react-router-dom";

const TableTemplate = ({
  tableHeading,
  firstHeading,
  dataList,
  requestStatus,
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
      <tr className="shadow d-flex col-12 backColor fs-5 rounded text-white border p-5 mb-3">
        <th className="col-12 text-center text-break text-uppercase">
          No item found
        </th>
      </tr>
    );
  }

  if (dataList.length && requestStatus === "completed") {
    content = dataList.map(({ id, firstHeading, secondHeading }, index) => (
      <tr
        key={index}
        className="shadow d-flex col-12 backColor fs-5 rounded text-white border p-1 mb-3"
      >
        <th className="col-3 text-center text-break">{firstHeading}</th>
        <th className="col-4 text-center text-break">{secondHeading}</th>
        <th className="col-3 text-center text-break">Author</th>
        <th className="col-2 text-center text-break">
          <Link to={`/item/${id}`} className="btn btn-success">
            OPEN
          </Link>
        </th>
      </tr>
    ));
  }

  return (
    <Row className="mb-5 col-12 rounded p-0 p-lg-3">
      <Table
        style={{ minWidth: "590px", minHeight: "40rem" }}
        responsive
        className="scrollBar reset position-relative"
      >
        <thead className="itemsHeading text-uppercase text-white mb-4 rounded">
          <tr>
            <th>
              <h2 className=" text-center p-3 pb-0 fs-1">{tableHeading}</h2>
            </th>
          </tr>
          <tr className="shadow d-flex col-12 fs-6 fw-bolder">
            <th className="col-3 text-center">{firstHeading}</th>
            <th className="col-4 text-center">Collection Name</th>
            <th className="col-3 text-center">Author</th>
            <th className="col-2 text-center">Link</th>
          </tr>
        </thead>
        <tbody style={{ borderTop: "none", cursor: "pointer" }}>
          {content}
        </tbody>
      </Table>
    </Row>
  );
};
export default TableTemplate;