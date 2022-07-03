import { Fragment, useState } from "react";

import Collection from "./Collection";

import CollectionSkeleton from "./CollectionSkeleton";

const LargestCollectionsList = ({
  largestCollections,
  requestStatus,
  requestError,
}) => {
  let content = (
    <Fragment>
      <CollectionSkeleton />
      <CollectionSkeleton />
      <CollectionSkeleton />
      <CollectionSkeleton />
      <CollectionSkeleton />
      <CollectionSkeleton />
    </Fragment>
  );

  if (!requestError && requestStatus === "completed") {
    content = largestCollections.map((collection) => (
      <Collection key={collection.id} {...{ collection }} />
    ));
  }

  return <Fragment>{content}</Fragment>;
};
export default LargestCollectionsList;
