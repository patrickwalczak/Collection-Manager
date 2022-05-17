import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ItemData = ({ itemData }) => {
  const convertedData = Object.entries(itemData);

  return (
    <Row className="mb-5 rounded col-12 p-4 bg-dark">
      {convertedData.map(([propertyHeading, propertyValue], index) => (
        <Col
          key={index}
          className="col-12 col-lg-6 p-2 p-md-3 p-xl-2 text-white"
        >
          <h5 className="col-10 text-break">{propertyHeading}</h5>
          <span className="col-10 text-break">{propertyValue}</span>
        </Col>
      ))}
    </Row>
  );
};
export default ItemData;
