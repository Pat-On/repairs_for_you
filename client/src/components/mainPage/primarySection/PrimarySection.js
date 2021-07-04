import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import classes from "./PrimarySection.module.scss";
const data = {
  id: 0,
  first_name: "test",
  last_name: "test",
  address: "address",
  area: "something",
  skills: ["1", "2"],
};

/**
 * @DescriptionFunction Sub component used in MainPage component
 */
const PrimarySection = (props) => {
  return (
    <div className={classes.primary}>
      <div>
        <h1 className={classes.primary__heading}>
          <span className={classes.primary__heading__main}>
            FIND A REPAIRER
          </span>
          <span className={classes.primary__heading__sub}>
            FROM YOUR <span className={classes.temporary}>COMMUNITY</span>{" "}
          </span>
        </h1>
        <Link
          to="/users/handyman/register"
          className={`${classes.primary__button} ${classes.primary__button__publish}`}
        >
          BECOME A REPAIRER
        </Link>
        <Link
          to={{
            pathname: "/users/handyman/0/forms/request-for-quote",
            state: data,
          }}
          className={`${classes.primary__button} ${classes.primary__button__hire}`}
        >
          ASK FOR A PRICE
        </Link>
      </div>
    </div>
  );
};

export default PrimarySection;
