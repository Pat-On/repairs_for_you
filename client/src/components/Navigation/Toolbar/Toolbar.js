import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../../../UI/DrawerToggle/DrawerToggle";
import classes from "./Toolbar.module.scss";

const Toolbar = (props) => {
  return (
    <header className={classes.toolbar}>
      {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
      <nav className={classes.desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
