import "bootstrap/dist/css/bootstrap.min.css";

import classes from "./LargestCollections.module.css";
import CollectionSkeleton from "./CollectionSkeleton";

import { Link } from "react-router-dom";

import { useEffect, useState, Fragment } from "react";

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

  const backgroundImageStyle = !!collectionImage.length
    ? { backgroundImage: `url(${sourceLoaded})` }
    : { backgroundColor: "#FC766AFF" };

  return (
    <Fragment>
      {(!!sourceLoaded || !collectionImage.length) && (
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
            style={backgroundImageStyle}
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
      {!sourceLoaded && !!collectionImage.length && <CollectionSkeleton />}
    </Fragment>
  );
};
export default Collection;
