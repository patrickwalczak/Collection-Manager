import classes from "./LargestCollections.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

import { useEffect, useState, Fragment } from "react";

import CollectionSkeleton from "./CollectionSkeleton";

const Collection = ({ collection }) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);
  const { collectionImage } = collection;

  useEffect(() => {
    const img = new Image();
    img.src = collectionImage;
    img.onload = () => {
      setSourceLoaded(collectionImage);
    };
  }, [collectionImage]);

  return (
    <Fragment>
      {!!sourceLoaded && (
        <div key={collection.id} className={`${classes["collectionPreview"]}`}>
          <Link
            to={`/user/${collection.authorID}`}
            className={classes["authorProfileLink"]}
          >
            <div className={classes["authorProfileLink-content"]}>
              <span className={classes["authorProfileLink-span"]}>
                {collection.author}
              </span>
            </div>
          </Link>
          <div
            className={classes["collectionPreview-image"]}
            style={{ backgroundImage: `url(${sourceLoaded})` }}
          />
          <div className={classes["collectionPreview-shadow"]} />
          <div className={classes["collectionPreview-content"]}>
            <h2 className={classes["collectionPreview-content_title"]}>
              {collection.collectionName}
            </h2>
            <span className={classes["itemsNumber"]}>
              <span className={classes["span_itemsNumber"]}>
                {collection.firstHeading}
              </span>
              <br></br> ITEMS
            </span>
            <Link
              to={`/collection/${collection.id}`}
              className={classes["collectionPreview-content_btn"]}
            >
              VIEW COLLECTION
            </Link>
          </div>
        </div>
      )}
      {!sourceLoaded && <CollectionSkeleton />}
    </Fragment>
  );
};
export default Collection;
