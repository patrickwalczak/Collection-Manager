import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

const ProfileHeader = ({ isUserOrAdmin }) => {
  return (
    <Row className="mb-5 rounded">
      <Col className="rounded p-2 p-md-3 p-xl-4 text-center text-white bg-dark">
        <h1>Collections</h1>
        <div className="d-grid justify-content-end">
          {isUserOrAdmin && (
            <Link to="/newcollection" className="btn bg-white">
              CREATE
            </Link>
          )}
        </div>
      </Col>
    </Row>
  );
};
export default ProfileHeader;
