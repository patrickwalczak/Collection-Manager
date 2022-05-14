import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
import Tooltip from "react-bootstrap/Tooltip";

import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineFolderView } from "react-icons/ai";

import { useState } from "react";

const Item = ({
  id,
  itemValues,
  openEditForm,
  openDeleteForm,
  canBeChanged,
}) => {
  return (
    <tr className=" position-relative">
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
