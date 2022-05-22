import { Link } from "react-router-dom";

import AppContext from "../../store/app-context";

import { useContext } from "react";

const User = ({ user, handleChange }) => {
  const { language } = useContext(AppContext);

  const localeString = language === "EN" ? "en-US" : "pl";

  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const registrationTime = new Date(+user.registrationTime).toLocaleString(
    localeString,
    {
      options,
    }
  );
  const lastLoginTime = new Date(+user.lastLoginTime).toLocaleString(
    localeString,
    {
      options,
    }
  );

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
        <Link className="btn themeClass btn-light py-0" to={`/user/${user.id}`}>
          VIEW
        </Link>
      </td>
    </tr>
  );
};

export default User;
