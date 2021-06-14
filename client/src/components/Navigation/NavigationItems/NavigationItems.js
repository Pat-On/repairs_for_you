import React from "react";

import classes from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.navigationItems}>
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    {/* <NavigationItem link="/about">About</NavigationItem> */}
    {/* <NavigationItem link="/ho">HOME</NavigationItem> */}
    <NavigationItem link="/buyers">BUYERS</NavigationItem>
    <NavigationItem link="/handy">Handypeople</NavigationItem>
    <NavigationItem link="/contact">Contact</NavigationItem>
  </ul>
);

export default navigationItems;
