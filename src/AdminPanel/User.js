const User = ({ user, handleChange }) => {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const regTime = new Date(user.registrationTime).toLocaleString("en-US", {
    options,
  });
  const lastLoginTime = new Date(user.lastLoginTime).toLocaleString("en-US", {
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
      <td>TO DO</td>
      <td>{user.email}</td>
      <td>{lastLoginTime}</td>
      <td>{regTime}</td>
      <td>{user.status}</td>
    </tr>
  );
};

export default User;
