import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { FormattedMessage } from "react-intl";
// <FormattedMessage id="app-navigation.home.button" />

import { Fragment } from "react";
import User from "./User";

const Users = ({
  users,
  setUsers,
  token,
  requestError,
  requestStatus,
  resetHookState,
  theme,
}) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.id === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  return (
    <Fragment>
      {requestStatus === "loading" && <Spinner animation="border" />}
      {!!requestError && requestStatus === "completed" && token && (
        <Alert variant="danger" onClose={resetHookState} dismissible>
          <p>{requestError}</p>
        </Alert>
      )}
      {!requestError && requestStatus === "completed" && token && (
        <Table
          style={{ minWidth: "1200px" }}
          responsive
          striped
          bordered
          hover
          variant={theme}
        >
          <thead>
            <tr className="text-center">
              <th>
                <label className="px-1" htmlFor="allselect">
                  <FormattedMessage id="admin.panel.table.select.all" />
                </label>
                <input
                  type="checkbox"
                  name="allSelect"
                  checked={!users.some((user) => user?.isChecked !== true)}
                  onChange={handleChange}
                />
              </th>
              <th>ID</th>
              <th>
                <FormattedMessage id="admin.panel.table.username" />
              </th>
              <th>Email</th>
              <th>
                <FormattedMessage id="admin.panel.table.lastlogin" />
              </th>
              <th>
                <FormattedMessage id="admin.panel.table.registration.time" />
              </th>
              <th>Status</th>
              <th>
                <FormattedMessage id="admin.panel.table.user.type" />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <User key={user.id} user={user} handleChange={handleChange} />
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default Users;
