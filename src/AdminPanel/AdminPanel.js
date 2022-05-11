import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useState, useContext } from "react";
import Users from "./Users";
import AppContext from "../store/app-context";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const context = useContext(AppContext);

  const blockHandler = async () => {
    try {
      await changeActiveStatus("blocked", true);
    } catch (err) {}
  };

  const unblockHandler = async () => {
    try {
      await changeActiveStatus("active");
    } catch (err) {}
  };

  const changeActiveStatus = async (status, doCheck = false) => {
    try {
      const selectedUsers = users.filter((u) => u.isChecked);
      if (!selectedUsers.length) return;

      for await (const user of selectedUsers) {
        const res = await fetch(
          `http://localhost:5000/api/admin/changeStatus`,
          {
            method: "PATCH",
            body: JSON.stringify({ userId: user.id, status }),
            headers: {
              "Content-Type": "application/json",
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
          },
        }
      );
      const updatedUsers = await updatedUsersRes.json();
      // auth.fillUsers(updatedUsers.users);
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
          },
        });
        const data = await res.json();

        // auth.checkIfBlocked(data.userId, "Your account has been deleted.");

        await updateUsersTable();
      }
    } catch (err) {}
  };

  return (
    <Fragment>
      <ButtonGroup aria-label="Basic example">
        <Button onClick={blockHandler} variant="danger">
          BLOCK
        </Button>
        <Button onClick={unblockHandler} variant="success">
          UNBLOCK
        </Button>
        <Button onClick={deleteHandler} variant="secondary">
          DELETE
        </Button>
      </ButtonGroup>
      <Users users={users} setUsers={setUsers} />
    </Fragment>
  );
};

export default AdminPanel;
