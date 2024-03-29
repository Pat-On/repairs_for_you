import React from "react";

import classes from "./explanation.module.scss";

import svgArrow from "../../../public/right-arrow.svg";

/**
 * @DescriptionFunction Sub component used in MainPage component
 * !TODO: component is not yet implemented it is just placeholder
 */
const Explanation = (props) => {
  return (
    <div className={classes.explanation}>
      <h2 className={classes.explanation__header}>Just 3 Steps</h2>

      <h3 className={classes.explanation__header__sub__1}> For Buyers: </h3>
      <div
        className={`${classes.explanation__flexContainer} ${classes.explanation__listGridPos1}`}
      >
        <p className={classes.explanation__p1}>
          Register Your request by email 
        </p>
        <img
          className={classes.explanation__arrowSVG}
          src={svgArrow}
          alt="Arrow icon made by Roundicons"
        />
        <p className={classes.explanation__p2}>Receive offer</p>
        <img
          className={classes.explanation__arrowSVG}
          src={svgArrow}
          alt="Arrow icon made by Roundicons"
        />
        <p className={classes.explanation__p3}>Get Service From Us</p>
      </div>

      <h3 className={classes.explanation__header__sub__2}>
        {" "}
        For Repairers:{" "}
      </h3>
      <div
        className={`${classes.explanation__flexContainer} ${classes.explanation__listGridPos2}`}
      >
        <p className={classes.explanation__p1}>Register Your Service</p>
        <img
          className={classes.explanation__arrowSVG}
          src={svgArrow}
          alt="Arrow icon made by Roundicons"
        />
        <p className={classes.explanation__p2}>Get Accepted</p>
        <img
          className={classes.explanation__arrowSVG}
          src={svgArrow}
          alt="Arrow icon made by Roundicons"
        />
        <p className={classes.explanation__p3}>Receive Job Offers</p>
      </div>
    </div>
  );
};

export default Explanation;
