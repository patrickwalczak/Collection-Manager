import { Link } from "react-router-dom";

const User = ({ user, handleChange }) => {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const registrationTime = new Date(+user.registrationTime).toLocaleString(
    "en-US",
    {
      options,
    }
  );
  const lastLoginTime = new Date(+user.lastLoginTime).toLocaleString("en-US", {
    options,
  });

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          name={user.id}
          checked={user?.isChecked || false}
          onChange={handleChange}
        />
      </td>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{lastLoginTime}</td>
      <td>{registrationTime}</td>
      <td>{user.status}</td>
      <td>{user.userType}</td>
      <td className="text-center">
        <Link className="btn btn-primary py-0" to={`/user/${user.id}`}>
          VIEW
        </Link>
      </td>
    </tr>
  );
};

export default User;
