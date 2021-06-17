import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./mainPage.module.scss";

const MainPage = (props) => {
  return (
    <div className={classes.mainPage}>
      <div className={classes.mainPage__primary}>Primary</div>
      <div className={classes.mainPage__about}>About</div>
      <div className={classes.mainPage__customers}>Customer</div>
      <div className={classes.mainPage__explanation}>Explanation</div>
    </div>
  );
};

export default MainPage;
