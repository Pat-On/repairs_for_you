import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./CustomerCommentMain.module.scss";

const CustomerCommentMain = (props) => {
  return (
    <div className={classes.customer}>
      <p>USER COMMENT</p>
    </div>
  );
};

export default CustomerCommentMain;
