import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

import Item from "./Item";
import Heading from "./Heading";

const ItemsTable = ({
  tableHeadings,
  tableValues,
  openEditForm,
  openDeleteForm,
  canBeChanged,
}) => {
  return (
    <Table variant="dark" responsive className="mt-5">
      <thead>
        <tr>
          {tableHeadings.map((heading, index) => (
            <Heading key={index}>{heading}</Heading>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!!tableValues &&
          tableValues.map(({ id, itemValuesArray }) => (
            <Item
              openEditForm={openEditForm}
              openDeleteForm={openDeleteForm}
              key={id}
              id={id}
              itemValues={itemValuesArray}
              canBeChanged={canBeChanged}
            />
          ))}
      </tbody>
    </Table>
  );
};
export default ItemsTable;
