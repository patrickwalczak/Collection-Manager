import Users from "./Users";
import ConfirmOperationModal from "./ConfirmOperationModal";

import AppContext from "../store/app-context";
import OperationButtons from "./OperationButtons";

import { FormattedMessage } from "react-intl";

import { Fragment, useState, useContext, useEffect, useCallback } from "react";

import useHttp from "../hooks/useHttp";

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

  const { userType, token, theme } = useContext(AppContext);

  const { requestStatus, requestError, sendRequest, resetHookState } =
    useHttp();

  const operationButtonStyle = `btn-${theme} px-1 py-0 fs-4 fw-bolder`;

  const handleClosingModal = () => setModalVisibility(false);
  const handleOpeningModal = () => setModalVisibility(true);
  const handleUpdating = () => setIsBeingUpdated(true);

  const openRemoveAdminModal = () =>
    handleOpeningOperationModal(
      { userType: "user" },
      <FormattedMessage id="admin.panel.remove.admin.question" />
    );
  const openAddAdminModal = () =>
    handleOpeningOperationModal(
      { userType: "admin" },
      <FormattedMessage id="admin.panel.add.admin.question" />
    );
  const openUnblockUserModal = () =>
    handleOpeningOperationModal(
      { status: "active" },
      <FormattedMessage id="admin.panel.unblock.user.question" />
    );
  const openBlockUserModal = () =>
    handleOpeningOperationModal(
      { status: "block" },
      <FormattedMessage id="admin.panel.block.user.question" />
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
    setModalQuestion(
      <FormattedMessage id="admin.panel.delete.user.question" />
    );
    handleSelectedUsers();
    setUrl("delete");
    handleOpeningModal();
  };

  useEffect(() => {
    if (users.length || !!requestStatus) return;
    getUsers();
  }, [users, getUsers, requestStatus]);

  useEffect(() => {
    if (!isBeingUpdated) return;
    getUsers();
    setIsBeingUpdated(false);
  }, [getUsers, isBeingUpdated]);

  return (
    <Fragment>
      {!!token &&
        !!selectedUsers?.length &&
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
      <OperationButtons
        operationButtonStyle={operationButtonStyle}
        openRemoveAdminModal={openRemoveAdminModal}
        openAddAdminModal={openAddAdminModal}
        openUnblockUserModal={openUnblockUserModal}
        openBlockUserModal={openBlockUserModal}
        openDeleteUsersModal={openDeleteUsersModal}
      />
      {!!token && userType === "admin" && (
        <Users
          requestError={requestError}
          requestStatus={requestStatus}
          resetHookState={resetHookState}
          token={token}
          users={users}
          setUsers={setUsers}
          modalQuestion={modalQuestion}
          theme={theme}
        />
      )}
    </Fragment>
  );
};

export default AdminPanel;
