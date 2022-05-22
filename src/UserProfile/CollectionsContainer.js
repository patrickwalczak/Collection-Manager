import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";

import Collection from "./Collection";

const CollectionsContainer = ({
  username,
  collections,
  requestError,
  requestStatus,
  getCollectionId,
  openEditForm,
  deleteCollection,
  displayOperationsButtons,
  theme,
}) => {
  let content;

  if (collections.length && !requestError && requestStatus === "completed") {
    content = collections.map(({ id, ...restCollectionProps }) => (
      <Collection
        theme={theme}
        displayOperationsButtons={displayOperationsButtons}
        deleteCollection={deleteCollection}
        getCollectionId={getCollectionId}
        openEditForm={openEditForm}
        key={id}
        id={id}
        {...restCollectionProps}
      />
    ));
  }

  if (
    collections.length === 0 &&
    !requestError &&
    requestStatus === "completed"
  ) {
    content = (
      <div className="col-12 p-5 themeClass">
        <p className="fs-3 text-center">
          {username} hasn't created any collection, yet.
        </p>
      </div>
    );
  }
  return (
    <Col className="d-flex flex-wrap justify-content-center gap-4">
      {content}
    </Col>
  );
};
export default CollectionsContainer;
