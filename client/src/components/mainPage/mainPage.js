import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./MainPage.module.scss";
import PrimarySection from "./primarySection/PrimarySection";

// !TODO: decomposition of this elements in next stage


const MainPage = (props) => {
  return (
    <div className={classes.mainPage}>
      <PrimarySection />
      <div className={classes.mainPage__about}>About</div>
      <div className={classes.mainPage__customers}>Customer</div>
      <div className={classes.mainPage__explanation}>Explanation</div>
    </div>
  );
};

export default MainPage;
