import React from "react";

import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.scss";

const navigationItem = (props) => (
  <li className={classes.navigationItem}>
    <NavLink
      className="navigationItem__link"
      exact={props.exact}
      activeClassName={classes.active}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
