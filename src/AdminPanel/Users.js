import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import User from "./User";
import useHttp from "../hooks/useHttp";

const Users = ({ users, setUsers, token }) => {
  const { requestStatus, requestError, sendRequest, resetHookState } =
    useHttp();

  const getUsers = async () => {
    try {
      const data = await sendRequest("http://localhost:5000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setUsers(data.users);
    } catch (err) {}
  };

  useEffect(() => {
    if (users.length) return;
    getUsers();
  }, [users]);

  return (
    <Fragment>
      {requestStatus === "loading" && <Spinner animation="border" />}
      {!!requestError && requestStatus === "completed" && token && (
        <Alert variant="danger" onClose={resetHookState} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{requestError}</p>
        </Alert>
      )}
      {!requestError && requestStatus === "completed" && token && (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Last login time</th>
              <th>Registration time</th>
              <th>Status</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default Users;
