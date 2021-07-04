import React, { useContext } from "react";

import classes from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem.js";
import AuthContext from "../../../store/authContext";

const navigationItems = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className={classes.navigationItems}>
      {/* <NavigationItem link="/" exact>
        Home
      </NavigationItem> */}
      <NavigationItem link="/users/handyman">Find A Repairer</NavigationItem>
      <NavigationItem link="/contact">Contact US</NavigationItem>
      {authCtx.isLoggedIn && (
        <NavigationItem link="/admin-panel">Admin Panel</NavigationItem>
      )}
      {/* {!authCtx.isLoggedIn && (
        <NavigationItem link="/signin">Sign-In</NavigationItem>
      )} */}
      {authCtx.isLoggedIn && (
        <NavigationItem link="/signinout">Sign-Out</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
