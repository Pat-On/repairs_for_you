import React from "react";
import { Link } from "react-router-dom";

import repairsLogo from "../../public/logo.png";
/**
 * @DescriptionFunction Reusable component which can be styled in very simple way by passing the <props.height>
 * background-color is inherit from the parent element.
 */
import classes from "./Logo.module.scss";
// TODO: added Link may give problems in styling add class in that case and style it
const logo = (props) => (
  <Link to="/">
    <div className={classes.logo} style={{ height: props.height }}>
      <img src={repairsLogo} alt="an arm holding a spanner" />
    </div>
  </Link>
);

export default logo;
