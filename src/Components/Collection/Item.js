import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

import { Link } from "react-router-dom";

const Item = ({
  id,
  name,
  tags,
  itemValues,
  openEditForm,
  openDeleteForm,
  canBeChanged,
  theme,
}) => {
  const operationButtonStyle = `btn-${theme} px-1 py-0 fs-4 fw-bolder`;

  return (
    <tr className="position-relative">
      <td className="text-break">{id}</td>
      <td className="text-break">{name}</td>
      <td className="text-break">
        {tags.map((tag, index) => (
          <Badge
            className={`${
              theme === "dark"
                ? "bg-light text-dark mx-2"
                : "bg-dark text-white mx-2"
            }`}
            key={index}
          >
            {tag}
          </Badge>
        ))}
      </td>
      {itemValues.map((itemValue, index) => (
        <td key={index} className="text-break">
          {itemValue}
        </td>
      ))}
      {canBeChanged && (
        <td className="d-flex justify-content-center gap-1">
          <Link to={`/item/${id}`} className={operationButtonStyle}>
            <AiFillEye />
          </Link>
          <Button
            onClick={() => openEditForm(id)}
            className={operationButtonStyle}
          >
            <AiFillEdit />
          </Button>
          <Button
            onClick={() => openDeleteForm(id)}
            className={operationButtonStyle}
          >
            <AiFillDelete />
          </Button>
        </td>
      )}
      {!canBeChanged && (
        <td width="7%" className="text-center">
          <Link to={`/item/${id}`} className={operationButtonStyle}>
            <AiFillEye />
          </Link>
        </td>
      )}
    </tr>
  );
};

export default Item;
