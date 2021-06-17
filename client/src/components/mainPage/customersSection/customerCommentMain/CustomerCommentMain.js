import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./CustomerCommentMain.module.scss";




const CustomerCommentMain = (props) => {

  let stars = []
for (let i = 0; i < props.item.review; i++ ) {
  stars.push("   *   ")
}
  return (
    <div className={classes.customer}>
      <img src={props.item.photo} />
      <p>{props.item.comment}</p>
      <p>{stars}</p>
    </div>
  );
};

export default CustomerCommentMain;
