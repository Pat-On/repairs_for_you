import React, { useState, useCallback, useEffect } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

//helper functions

const calcRemainingTime = (expiration) => {
  const currentTime = new Date().getTime();
  const expirationOfToken = new Date(expiration).getTime();
  const remainingTime = expirationOfToken - currentTime;
  console.log(remainingTime);

  return remainingTime;
};

const getStoredItem = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expTime");

  // const remainingTime = calcRemainingTime(storedExpirationTime);
  const remainingTime = 10000

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

// exported context
export const AuthContextProvide = (props) => {
  const tokenData = getStoredItem();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expiration) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expTime", toexpirationken);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };


  // Setting the timer
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
