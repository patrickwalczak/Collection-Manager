import React from "react";

const AppContext = React.createContext({
  username: null,
  userId: null,
  token: null,
  userType: null,
  theme: null,
  login: (item) => {},
  logout: (id) => {},
  checkUser: () => {},
  changeTheme: () => {},
});

export default AppContext;
