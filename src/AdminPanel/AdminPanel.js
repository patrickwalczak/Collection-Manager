import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useState, useContext } from "react";
import Users from "./Users";
import AppContext from "../store/app-context";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const { userId, userType, token } = useContext(AppContext);

  const blockUser = async () => {
    try {
      await changeUserAccount({ status: "blocked" }, true);
    } catch (err) {}
  };

  const unblockUser = async () => {
    try {
      await changeUserAccount({ status: "active" });
    } catch (err) {}
  };

  const addAdmin = async () => {
    try {
      await changeUserAccount({ userType: "admin" });
    } catch (err) {}
  };

  const removeAdmin = async () => {
    try {
      await changeUserAccount({ userType: "user" });
    } catch (err) {}
  };

  const changeUserAccount = async (propertyToUpdate, doCheck = false) => {
    try {
      const selectedUsers = users.filter((u) => u.isChecked);
      if (!selectedUsers.length) return;

      for await (const user of selectedUsers) {
        const res = await fetch(
          `http://localhost:5000/api/admin/${user.id}/updateUserAccount`,
          {
            method: "PATCH",
            body: JSON.stringify({ propertyToUpdate }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await res.json();
        // if (doCheck)
        // auth.checkIfBlocked(data.userId, "Your account has been blocked.");
      }
      await updateUsersTable();
    } catch (err) {
      throw err;
    }
  };

  const updateUsersTable = async () => {
    try {
      const updatedUsersRes = await fetch(
        `http://localhost:5000/api/admin/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const updatedUsers = await updatedUsersRes.json();
      setUsers(updatedUsers.users);
    } catch (err) {
      throw err;
    }
  };

  const deleteHandler = async () => {
    try {
      const selectedUsers = users.filter((u) => u.isChecked);
      if (!selectedUsers.length) return;
      for await (const user of selectedUsers) {
        const res = await fetch(`http://localhost:5000/api/admin/delete`, {
          method: "DELETE",
          body: JSON.stringify({ userId: user.id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();

        // auth.checkIfBlocked(data.userId, "Your account has been deleted.");

        // await updateUsersTable();
      }
    } catch (err) {}
  };

  return (
    <Fragment>
      <ButtonGroup>
        <Button onClick={blockUser} variant="danger">
          BLOCK
        </Button>
        <Button onClick={unblockUser} variant="success">
          UNBLOCK
        </Button>
        <Button onClick={deleteHandler} variant="secondary">
          DELETE
        </Button>
        <Button onClick={addAdmin} variant="light">
          ADD ADMIN
        </Button>
        <Button onClick={removeAdmin}>REMOVE ADMIN</Button>
      </ButtonGroup>
      {token && userType === "admin" && (
        <Users token={token} users={users} setUsers={setUsers} />
      )}
    </Fragment>
  );
};

export default AdminPanel;
