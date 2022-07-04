import classes from "./LatestItems.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

const LatestItem = ({ firstHeading, id }) => {
  return (
    <div className={`rounded ${classes["latestItem"]}`}>
      <div className={`${classes["latestItem-title"]} `}>
        <span>title</span>
        <h3>{firstHeading}</h3>
      </div>
      <Link to={`/item/${id}`} className={`${classes["itemLink"]}`}>
        SEE ITEM
        <div className={`${classes["itemLink-block"]} `} />
      </Link>
    </div>
  );
};
export default LatestItem;
