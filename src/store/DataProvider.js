import AppContext from "./app-context";
import { useState } from "react";

const DataProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = ({ token, userId, username, userType }) => {
    setToken(token);
    setUserId(userId);
    setUsername(username);
    setUserType(userType);
  };

  const logout = () => {
    console.log("test");
    setToken(null);
    setUserId(null);
    setUsername(null);
    setUserType(null);
  };

  const appContext = {
    username,
    userId,
    token,
    userType,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default DataProvider;
