import React from "react";
import { Link } from "react-router-dom";

import classes from "./PrimarySection.module.scss";

/**
 * @DescriptionFunction Sub component used in MainPage component
 */
const PrimarySection = (props) => {
  return (
    <div className={classes.primary}>
      <div>
        <h1 className={classes.primary__heading}>
          <span className={classes.primary__heading__main}>
            find a repairer
          </span>
          <span className={classes.primary__heading__sub}>
            from your <span>community</span>
          </span>
        </h1>
        <Link
          to="/users/handyman/register"
          className={`${classes.primary__button} ${classes.primary__button__publish}`}
        >
          BECOME A REPAIRER
        </Link>
        <Link
          to="/users/handyman/0/forms/request-for-quote"
          className={`${classes.primary__button} ${classes.primary__button__hire}`}
        >
          ASK FOR A PRICE
        </Link>
      </div>
    </div>
  );
};

export default PrimarySection;
