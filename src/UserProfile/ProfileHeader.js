import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { AiFillFileAdd } from "react-icons/ai";

import { Link } from "react-router-dom";

const ProfileHeader = ({
  displayOperationsButtons,
  userId,
  username,
  theme,
}) => {
  return (
    <Row className="themeClass mb-5 rounded">
      <Col className="rounded shadow p-2 p-md-3 p-xl-4 text-center">
        {displayOperationsButtons && (
          <div className="d-grid justify-content-end">
            <Link
              title="Create Collection"
              to={`/${userId}/newcollection`}
              className={`btn btn-${theme} px-1 py-0 fs-2`}
            >
              <AiFillFileAdd />
            </Link>
          </div>
        )}
      </Col>
    </Row>
  );
};
export default ProfileHeader;
