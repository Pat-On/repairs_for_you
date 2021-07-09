import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems.js";
import Aux from "../../../hoc/Auxillary/Auxillary.js";
import BackDrop from "../../../UI/Backdrop/Backdrop.js";
import classes from "./SideDrawer.module.scss";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Closed];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
