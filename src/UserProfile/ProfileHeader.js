import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

const ProfileHeader = ({ displayOperationsButtons, userId, username }) => {
  return (
    <Row className="mb-5 rounded">
      <Col className="itemsHeading rounded p-2 p-md-3 p-xl-4 text-center text-white">
        <h1>Collections</h1>
        <div className="d-grid justify-content-between">
          {!displayOperationsButtons && <h4>Author: {username}</h4>}
          {displayOperationsButtons && (
            <Link to={`/${userId}/newcollection`} className="btn bg-white">
              CREATE
            </Link>
          )}
        </div>
      </Col>
    </Row>
  );
};
export default ProfileHeader;
