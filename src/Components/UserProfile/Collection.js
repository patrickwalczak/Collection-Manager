import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { AiFillEye } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

import ReactMarkdown from "react-markdown";

import { Link } from "react-router-dom";

const Collection = ({
  collectionDescription,
  collectionName,
  collectionTopic,
  id,
  collectionImage,
  openEditForm,
  deleteCollection,
  displayOperationsButtons,
  theme,
}) => {
  const operationBtnClass = `btn btn-${theme} px-1 py-0 fs-3`;

  const imageLink = collectionImage.length
    ? `${process.env.REACT_APP_SOCKET_URL}/${collectionImage}`
    : "";

  return (
    <Row
      className="themeClass shadow col-12 col-md-8 col-lg-12 flex-xl-row mx-0"
      style={{ minHeight: "12rem" }}
    >
      <Col className="col-12 col-lg-8 p-3 p-xl-4 order-2 order-lg-1">
        <h3 className="fs-1 fw-normal border-bottom pb-2">{collectionName}</h3>
        <span className="d-flex mb-2">{collectionTopic}</span>
        <ReactMarkdown className="col-11">
          {collectionDescription}
        </ReactMarkdown>
        <div
          data-id={id}
          className="col-12 d-flex p-2 gap-3 flex-wrap border-top"
        >
          <Link
            title="Open Collection"
            to={`/collection/${id}`}
            className={operationBtnClass}
          >
            <AiFillEye />
          </Link>
          {displayOperationsButtons && (
            <Button
              title="Edit Collection"
              className={operationBtnClass}
              onClick={openEditForm}
            >
              <AiFillEdit />
            </Button>
          )}
          {displayOperationsButtons && (
            <Button
              title="Delete Collection"
              className={operationBtnClass}
              onClick={deleteCollection}
            >
              <AiFillCloseCircle />
            </Button>
          )}
        </div>
      </Col>
      <Col
        className={`${
          theme === "dark" ? "bg-light" : "bg-dark"
        } rounded col-12 col-lg-4 order-1 order-lg-2 p-0`}
      >
        <img
          style={{
            objectFit: "cover",
            display: `${imageLink.length ? "block" : "none"}`,
          }}
          width="100%"
          height="100%"
          src={`${imageLink}`}
          alt="collection image"
        />
      </Col>
    </Row>
  );
};

export default Collection;
