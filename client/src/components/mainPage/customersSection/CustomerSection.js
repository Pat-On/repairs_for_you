import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./CustomerSection.module.scss";

import backgroundVideo from "../../../public/ConstructionWorkersDESKTOP.mp4"
// import CustomerCommentMain from "./customerCommentMain/CustomerCommentMain.scss";

const CustomerSection = (props) => {
  // !TODO: background video is good candidate for independent component

  return (
    <div className={classes.customers}>
      <div className={classes.customers__bgVideo}>
        <video className={classes.customers__bgVideo__video} autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser is not supported!
        </video>
      </div>

      <h2>Happy Customers</h2>
    </div>
  );
};

export default CustomerSection;
