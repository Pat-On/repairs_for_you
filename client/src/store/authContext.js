import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvide = (props) => {
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
