import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./CustomerCommentMain.module.scss";

const CustomerCommentMain = (props) => {
  let stars = [];
  for (let i = 0; i < props.item.review; i++) {
    stars.push("   *   ");
  }
  return (
    <div className={classes.customer}>
      <figure className={classes.customer__figure}>
        <img src={props.item.photo} />
        <figcaption className={classes.customer__figcaption}>
          {props.item.user_name} {props.item.user_surname[0]}.
        </figcaption>
      </figure>

      <p>{props.item.comment}</p>
      <p>{stars}</p>
    </div>
  );
};

export default CustomerCommentMain;
