import React from "react";

const AppContext = React.createContext({
  username: null,
  userId: null,
  token: null,
  userType: null,
  login: (item) => {},
  logout: (id) => {},
});

export default AppContext;
