import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineFolderView } from "react-icons/ai";

const Item = ({
  id,
  name,
  tags,
  itemValues,
  openEditForm,
  openDeleteForm,
  canBeChanged,
}) => {
  return (
    <tr className=" position-relative">
      <td className="text-break">{id}</td>
      <td className="text-break">{name}</td>
      <td className="text-break">
        {tags.map((tag, index) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </td>
      {itemValues.map((itemValue, index) => (
        <td key={index} className="text-break">
          {itemValue}
        </td>
      ))}
      {canBeChanged && (
        <td className="text-end d-flex gap-2 justify-content-end">
          <Button variant="success" className="py-0">
            <AiOutlineFolderView />
          </Button>

          <Button
            variant="warning"
            onClick={() => openEditForm(id)}
            className="py-0 text-white"
          >
            <AiFillEdit />
          </Button>

          <Button
            variant="danger"
            onClick={() => openDeleteForm(id)}
            className="py-0"
          >
            <AiFillDelete />
          </Button>
        </td>
      )}
      {!canBeChanged && (
        <td className="text-end">
          <Button className="center py-0">VIEW</Button>
        </td>
      )}
    </tr>
  );
};

export default Item;
