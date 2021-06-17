import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./PrimarySection.module.scss";

// !TODO: decomposition of this elements in next stage

const PrimarySection = (props) => {
  return (
    <div className={classes.primary}>
      <div>
        {" "}
        <h1 className={classes.primary__heading}>
          <span className={classes.primary__heading__main}>
            REPAIRS FOR YOU
          </span>
          <span className={classes.primary__heading__sub}>WE FIX IT RIGHT</span>
        </h1>
        <Link to="/" className={`${classes.primary__button} ${classes.primary__button__publish}`}>Publish Offer</Link>
        <Link to="/" className={`${classes.primary__button} ${classes.primary__button__hire}`}>Publish Offer</Link>
      </div>
    </div>
  );
};

export default PrimarySection;
