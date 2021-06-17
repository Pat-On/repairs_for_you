import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./CustomerSection.module.scss";

import backgroundVideo from "../../../public/ConstructionWorkersDESKTOP.mp4";
import CustomerCommentMain from "./customerCommentMain/CustomerCommentMain";

import customer1 from "../../../public/5.jpg";
import customer2 from "../../../public/17.jpg";
import customer3 from "../../../public/81.jpg";

const CustomerSection = (props) => {
  // !TODO: HARD CODED CUSTOMER next step randomize comments from DB
  const commentArray = [
    {
      photo: customer1,
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
       in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      review: 5,
    },
    {
      photo: customer2,
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
     in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      review: 3,
    },
    {
      photo: customer3,
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
   in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      review: 4,
    },
  ];

  let usersComments = <p> LOADING... </p>;

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
      <h2 className={classes.customers__heading} > Happy Customers </h2>
      <div className={classes.customers__commentContainer}> {usersComments} </div>
    </div>
  );
};

export default CustomerSection;
