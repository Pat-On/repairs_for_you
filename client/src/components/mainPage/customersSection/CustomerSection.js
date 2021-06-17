import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./CustomerSection.module.scss";

import backgroundVideo from "../../../public/ConstructionWorkersDESKTOP.mp4";
import CustomerCommentMain from "./customerCommentMain/CustomerCommentMain";

import customer1 from "../../../public/5.jpg"
import customer2 from "../../../public/17.jpg"
import customer3 from "../../../public/81.jpg"


const CustomerSection = (props) => {
  // !TODO: HARD CODED CUSTOMER next step randomize comments from DB
  const commentArray = [1, 2, 3];

  let usersComments = <p>LOADING...</p>;

  if (commentArray.length === 3) {
    usersComments = commentArray.map((item) => (
      <CustomerCommentMain item={item} />
    ));
  }

  return (
    <div className={classes.customers}>
      <div className={classes.customers__bgVideo}>
        <video
          className={classes.customers__bgVideo__video}
          autoPlay
          muted
          loop
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser is not supported!
        </video>
      </div>

      <h2>Happy Customers</h2>

      <div>{usersComments}</div>
    </div>
  );
};

export default CustomerSection;
