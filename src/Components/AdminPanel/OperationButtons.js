import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import { AiFillDelete } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineUserDelete } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import { AiFillUnlock } from "react-icons/ai";

import { FormattedMessage } from "react-intl";

const OperationButtons = ({
  operationButtonStyle,
  openBlockUserModal,
  openUnblockUserModal,
  openDeleteUsersModal,
  openAddAdminModal,
  openRemoveAdminModal,
}) => {
  return (
    <div className="d-flex gap-2 justify-content-end col-12 mt-4 pb-1">
      <Button
        title="Block User"
        className={operationButtonStyle}
        onClick={openBlockUserModal}
      >
        <AiFillLock />
      </Button>
      <Button
        title="Unblock User"
        className={operationButtonStyle}
        onClick={openUnblockUserModal}
      >
        <AiFillUnlock />
      </Button>
      <Button
        title="Delete User"
        className={operationButtonStyle}
        onClick={openDeleteUsersModal}
      >
        <AiFillDelete />
      </Button>
      <Button
        title="Add Admin"
        className={operationButtonStyle}
        onClick={openAddAdminModal}
      >
        <AiOutlineUserAdd />
      </Button>
      <Button
        title="Remove Admin"
        className={operationButtonStyle}
        onClick={openRemoveAdminModal}
      >
        <AiOutlineUserDelete />
      </Button>
    </div>
  );
};
export default OperationButtons;
