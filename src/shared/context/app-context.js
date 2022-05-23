import React from "react";

const AppContext = React.createContext({
  username: null,
  userId: null,
  token: null,
  userType: null,
  theme: null,
  language: null,
  messages: null,
  logIn: (item) => {},
  logout: (id) => {},
  logOutAdmin: () => {},
  changeTheme: () => {},
  changeLanguage: () => {},
  resetLogOutModal: () => {},
});

export default AppContext;
