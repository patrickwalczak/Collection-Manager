const User = ({ user }) => {
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
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{lastLoginTime}</td>
      <td>{registrationTime}</td>
      <td>{user.status}</td>
      <td>{user.userType}</td>
    </tr>
  );
};

export default User;
