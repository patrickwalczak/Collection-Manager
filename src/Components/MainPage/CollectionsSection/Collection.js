import classes from "./LargestCollections.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

const Collection = ({ collection }) => {
  return (
    <div key={collection.id} className={`${classes["collectionPreview"]} mb-4`}>
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
        onLoad={() => console.log("test")}
        className={classes["collectionPreview-image"]}
        style={{ backgroundImage: `url(${collection.collectionImage})` }}
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
  );
};
export default Collection;
