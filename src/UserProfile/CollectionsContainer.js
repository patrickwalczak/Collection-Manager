import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Col from "react-bootstrap/Col";

import Collection from "./Collection";

const CollectionsContainer = ({
  collections,
  requestError,
  requestStatus,
  getCollectionId,
  openEditForm,
}) => {
  let content;

  if (collections.length && !requestError && requestStatus === "completed") {
    content = collections.map(({ id, ...restCollectionProps }) => (
      <Collection
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
    content = <p>There is no collection, maybe create one.</p>;
  }
  return (
    <Col className="d-flex flex-xl-column flex-wrap gap-4 gap-md-0 gap-xl-3 justify-content-around ">
      {content}
    </Col>
  );
};
export default CollectionsContainer;
