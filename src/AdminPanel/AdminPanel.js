import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useState, useContext, useEffect, useCallback } from "react";
import Users from "./Users";
import AppContext from "../store/app-context";
import useHttp from "../hooks/useHttp";
import ConfirmOperationModal from "./ConfirmOperationModal";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("");
  const [modalQuestion, setModalQuestion] = useState("");

  const [additionalRequestBodyProperty, setAdditionalRequestBodyProperty] =
    useState({});

  const [isBeingUpdated, setIsBeingUpdated] = useState(false);
  const [deleteUsersModalVisibility, setModalVisibility] = useState(false);

  const { userType, token, checkUser } = useContext(AppContext);

  const { requestStatus, requestError, sendRequest, resetHookState } =
    useHttp();

  const handleClosingModal = () => setModalVisibility(false);
  const handleOpeningModal = () => setModalVisibility(true);
  const handleUpdating = () => setIsBeingUpdated(true);

  const openRemoveAdminModal = () =>
    handleOpeningOperationModal(
      { userType: "user" },
      "Are you sure you want to remove admin(s)?"
    );
  const openAddAdminModal = () =>
    handleOpeningOperationModal(
      { userType: "admin" },
      "Are you sure you want to add admin(s)?"
    );
  const openUnblockUserModal = () =>
    handleOpeningOperationModal(
      { status: "active" },
      "Are you sure you want to block user(s)?"
    );
  const openBlockUserModal = () =>
    handleOpeningOperationModal(
      { status: "block" },
      "Are you sure you want to remove user(s)?"
    );

  const getUsers = useCallback(async () => {
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setUsers(data.users);
    } catch (err) {}
  }, []);

  const clearAdminPanelStates = () => {
    setUrl("");
    setAdditionalRequestBodyProperty({});
    setUsers([]);
    setSelectedUsers([]);
    setMethod("");
    setModalQuestion("");
  };

  const getSelectedUsers = () => {
    if (!users.length) return [];
    const filteredAndSelectedUsers = users
      .filter((user) => user.isChecked)
      .map((user) => user.id);
    return filteredAndSelectedUsers;
  };

  const handleSelectedUsers = () => {
    const selectedUsers = getSelectedUsers();
    if (!selectedUsers.length) return;
    setSelectedUsers(selectedUsers);
  };

  const handleOpeningOperationModal = (objectWithProperty, heading) => {
    setMethod("PATCH");
    setModalQuestion(heading);
    handleSelectedUsers();
    setUrl("updateUsersAccounts");
    setAdditionalRequestBodyProperty(objectWithProperty);
    handleOpeningModal();
  };

  const openDeleteUsersModal = () => {
    setMethod("DELETE");
    setModalQuestion("Are you sure you want to delete user(s)?");
    handleSelectedUsers();
    setUrl("delete");
    handleOpeningModal();
  };

  useEffect(() => {
    if (users.length) return;
    getUsers();
  }, [users, getUsers]);

  useEffect(() => {
    if (!isBeingUpdated) return;
    getUsers();
    setIsBeingUpdated(false);
  }, [getUsers, isBeingUpdated]);

  return (
    <Fragment>
      {!!token &&
        !!selectedUsers.length &&
        !!url &&
        (!!Object.keys(additionalRequestBodyProperty).length ||
          method === "DELETE") && (
          <ConfirmOperationModal
            modalVisibilityState={deleteUsersModalVisibility}
            handleCloseModal={handleClosingModal}
            triggerUpdate={handleUpdating}
            token={token}
            clearState={clearAdminPanelStates}
            url={url}
            requestBodyObject={{
              users: selectedUsers,
              ...additionalRequestBodyProperty,
            }}
            method={method}
          />
        )}
      <ButtonGroup>
        <Button onClick={openBlockUserModal} variant="danger">
          BLOCK
        </Button>
        <Button onClick={openUnblockUserModal} variant="success">
          UNBLOCK
        </Button>
        <Button onClick={openDeleteUsersModal} variant="secondary">
          DELETE
        </Button>
        <Button onClick={openAddAdminModal} variant="light">
          ADD ADMIN
        </Button>
        <Button onClick={openRemoveAdminModal}>REMOVE ADMIN</Button>
      </ButtonGroup>
      {token && userType === "admin" && (
        <Users
          requestError={requestError}
          requestStatus={requestStatus}
          resetHookState={resetHookState}
          token={token}
          users={users}
          setUsers={setUsers}
          modalQuestion={modalQuestion}
        />
      )}
    </Fragment>
  );
};

export default AdminPanel;
