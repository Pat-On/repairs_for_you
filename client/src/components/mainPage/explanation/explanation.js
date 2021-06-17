import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./Explanation.module.scss";

// !TODO: decomposition of this elements in next stage

const Explanation = (props) => {
  return (
    <div className={classes.explanation}>
      <p>I am explanation - how it works</p>
    </div>
  );
};

export default Explanation;
