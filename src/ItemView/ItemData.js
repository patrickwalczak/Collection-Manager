import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";

const ItemData = ({ itemData }) => {
  const convertedData = Object.entries(itemData);

  return convertedData.map(([propertyHeading, propertyValue], index) => (
    <Col key={index} className="col-12 col-lg-6 p-2 p-md-3 p-xl-2 mb-5 mt-5">
      <h5 className="col-10 text-break fw-normal">{propertyHeading}</h5>
      <span className="col-10 text-break text-secondary fs-5">
        {propertyValue}
      </span>
    </Col>
  ));
};
export default ItemData;
