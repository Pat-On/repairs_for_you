import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems.js";
import DrawerToggle from "../../../UI/DrawerToggle/DrawerToggle.js";
import classes from "./Toolbar.module.scss";
import Logo from "../../logo/Logo"




const Toolbar = (props) => {
  return (
    <header className={classes.toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <Logo height="8rem" />
      <nav className={classes.desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
