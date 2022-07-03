import classes from "./LargestCollections.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CollectionSkeleton = () => {
  return (
    <div className={`${classes["collection-skeleton"]} mb-4`}>
      <h2>
        <Skeleton />
      </h2>
      <div>
        <Skeleton />
      </div>
    </div>
  );
};
export default CollectionSkeleton;
