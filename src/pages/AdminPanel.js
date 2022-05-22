import Users from "../Components/AdminPanel/Users";
import ConfirmOperationModal from "../Components/AdminPanel/ConfirmOperationModal";

import AppContext from "../store/app-context";
import OperationButtons from "../Components/AdminPanel/OperationButtons";

import { FormattedMessage } from "react-intl";

import { Fragment, useState, useContext, useEffect, useCallback } from "react";

import useHttp from "../hooks/useHttp";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [operationRequestObject, setOperationRequestObject] = useState(null);
  const [additionalRequestBodyProperty, setAdditionalRequestBodyProperty] =
    useState({});
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);
  const [deleteUsersModalVisibility, setModalVisibility] = useState(false);

  const { userType, token, theme, userId } = useContext(AppContext);

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
      { status: "blocked" },
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
    setAdditionalRequestBodyProperty({});
    setSelectedUsers([]);
    setOperationRequestObject(null);
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
    setOperationRequestObject({
      url: "updateUsersAccounts",
      method: "PATCH",
      modalQuestion: heading,
    });
    handleSelectedUsers();
    setAdditionalRequestBodyProperty(objectWithProperty);
    handleOpeningModal();
  };

  const openDeleteUsersModal = () => {
    setOperationRequestObject({
      url: "delete",
      method: "DELETE",
      modalQuestion: <FormattedMessage id="admin.panel.delete.user.question" />,
    });
    handleSelectedUsers();
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
        !!operationRequestObject &&
        (!!Object.keys(additionalRequestBodyProperty).length ||
          operationRequestObject?.method === "DELETE") && (
          <ConfirmOperationModal
            {...operationRequestObject}
            modalVisibilityState={deleteUsersModalVisibility}
            handleCloseModal={handleClosingModal}
            triggerUpdate={handleUpdating}
            token={token}
            clearState={clearAdminPanelStates}
            requestBodyObject={{
              users: selectedUsers,
              ...additionalRequestBodyProperty,
            }}
            loggedUserId={userId}
          />
        )}
      <OperationButtons
        {...{
          operationButtonStyle,
          openRemoveAdminModal,
          openAddAdminModal,
          openUnblockUserModal,
          openBlockUserModal,
          openDeleteUsersModal,
        }}
      />
      {!!token && userType === "admin" && (
        <Users
          {...{
            requestError,
            requestStatus,
            resetHookState,
            token,
            users,
            setUsers,
            theme,
          }}
        />
      )}
    </Fragment>
  );
};

export default AdminPanel;
