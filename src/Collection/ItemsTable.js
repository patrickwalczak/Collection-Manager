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
  isSorted,
  sortedTable,
  theme,
}) => {
  const tableValuesSet = isSorted ? sortedTable : tableValues;

  return (
    <Table
      style={{ minWidth: "900px" }}
      responsive
      striped
      bordered
      hover
      variant={theme}
      className="shadow"
    >
      <thead className="text-center">
        <tr>
          {tableHeadings.map((heading, index) => (
            <Heading key={index}>{heading}</Heading>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody className="text-center">
        {!!tableValues &&
          tableValuesSet.map(({ id, itemValuesArray, name, tags }) => (
            <Item
              theme={theme}
              openEditForm={openEditForm}
              openDeleteForm={openDeleteForm}
              key={id}
              name={name}
              tags={tags}
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
