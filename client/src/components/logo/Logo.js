import React from "react";

import repairsLogo from "../../public/logo.png"

import classes from "./Logo.module.scss";
const logo = (props) => (
  <div className={classes.logo} style={{ height: props.height }}>
    <img src={repairsLogo} alt="logo" />
  </div>
);

export default logo;

// style={{ height: props.height }}