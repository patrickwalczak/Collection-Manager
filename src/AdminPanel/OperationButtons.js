import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import { AiFillDelete } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineUserDelete } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import { AiFillUnlock } from "react-icons/ai";

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
        title="Block user"
        className={operationButtonStyle}
        onClick={openBlockUserModal}
      >
        <AiFillLock />
      </Button>
      <Button
        title="Unblock user"
        className={operationButtonStyle}
        onClick={openUnblockUserModal}
      >
        <AiFillUnlock />
      </Button>
      <Button
        title="Delete user"
        className={operationButtonStyle}
        onClick={openDeleteUsersModal}
      >
        <AiFillDelete />
      </Button>
      <Button
        title="Add admin"
        className={operationButtonStyle}
        onClick={openAddAdminModal}
      >
        <AiOutlineUserAdd />
      </Button>
      <Button
        title="Remove admin"
        className={operationButtonStyle}
        onClick={openRemoveAdminModal}
      >
        <AiOutlineUserDelete />
      </Button>
    </div>
  );
};
export default OperationButtons;
