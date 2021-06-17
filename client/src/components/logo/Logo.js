import React from "react";

import repairsLogo from "../../public/logo.png"
/**
 * @DescriptionFunction Reusable component which can be styled in very simple way by passing the <props.height>
 * background-color is inherit from the parent element.
 */
import classes from "./Logo.module.scss";
const logo = (props) => (
  <div className={classes.logo} style={{ height: props.height }}>
    <img src={repairsLogo} alt="logo" />
  </div>
);

export default logo;