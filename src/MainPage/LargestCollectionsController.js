import { Fragment } from "react";
import TableTemplate from "./TableTemplate";

const LargestCollectionsController = () => {
  return (
    <Fragment>
      <TableTemplate
        tableHeading="Largest collections"
        firstHeading="Number of items"
        dataList={[]}
      />
    </Fragment>
  );
};
export default LargestCollectionsController;
