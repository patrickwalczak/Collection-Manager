import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

const TableTemplate = ({ tableHeading, firstHeading, dataList }) => {
  let content;

  if (!dataList.length) {
  }

  return (
    <Row className="mb-5 col-12 rounded p-0 p-lg-3">
      <Table
        style={{ minWidth: "590px" }}
        responsive
        className="scrollBar reset"
      >
        <thead className="itemsHeading text-white mb-4 rounded">
          <tr>
            <th>
              <h2 className="text-center p-3 pb-0 fs-1">{tableHeading}</h2>
            </th>
          </tr>
          <tr className="shadow d-flex col-12 fs-5 text-uppercase fw-bolder">
            <th className="col-3 text-center">{firstHeading}</th>
            <th className="col-4 text-center">Collection Name</th>
            <th className="col-3 text-center">Author</th>
            <th className="col-2 text-center">Link</th>
          </tr>
        </thead>
        <tbody style={{ borderTop: "none" }}>
          {content}
          <tr className="shadow d-flex col-12 backColor fs-5 rounded text-white border p-1 mb-3">
            <th className="col-3 text-center text-break">Item name</th>
            <th className="col-4 text-center text-break">Collection</th>
            <th className="col-3 text-center text-break">Author</th>
            <th className="col-2 text-center text-break">x</th>
          </tr>
          <tr className="shadow d-flex col-12 backColor fs-5 rounded text-white border p-5 mb-3">
            <th className="col-12 text-center text-break text-uppercase">
              No item found
            </th>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};
export default TableTemplate;
