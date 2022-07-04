import LatestItem from "./LatestItem";

import { Fragment } from "react";

const LatestItemsList = ({ latestItems }) => {
  console.log(latestItems);

  return (
    <Fragment>
      {latestItems.map((latestItem) => (
        <LatestItem key={latestItem.id} {...latestItem} />
      ))}
    </Fragment>
  );
};
export default LatestItemsList;
