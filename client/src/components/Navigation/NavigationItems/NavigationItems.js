import React from "react";

import classes from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem.js";

const navigationItems = (props) => (
  <ul className={classes.navigationItems}>
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    {/* <NavigationItem link="/about">About</NavigationItem> */}
    {/* <NavigationItem link="/ho">HOME</NavigationItem> */}
    <NavigationItem link="/buyers">BUYERS</NavigationItem>
    <NavigationItem link="/users/handyman">Handypeople</NavigationItem>
    <NavigationItem link="/contact">Contact</NavigationItem>
    <NavigationItem link="/admin-panel">Admin Panel</NavigationItem>
    <NavigationItem link="/signin">Sign-In</NavigationItem>

  </ul>
);
 
export default navigationItems;
