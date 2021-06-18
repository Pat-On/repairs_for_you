import React from "react";

import classes from "./explanation.module.scss";

/**
 * @DescriptionFunction Sub component used in MainPage component
 * !TODO: component is not yet implemented it is just placeholder
 */
const Explanation = (props) => {
  return (
    <div className={classes.explanation}>
      <h2 className={classes.explanation__header}>So Simple: Just 3 Steps</h2>

      <h3 className={classes.explanation__header__sub__1}> For Buyers: </h3>
	  <div className={`${classes.explanation__flexContainer} ${classes.explanation__listGridPos1}`}>
      <p className={classes.explanation__p1}>first step</p>
      <p className={classes.explanation__p2}>second step</p>
      <p className={classes.explanation__p3}>this step</p>
	  </div>

      <h3 className={classes.explanation__header__sub__2}> For Handyperson: </h3>
	  <div className={`${classes.explanation__flexContainer} ${classes.explanation__listGridPos2}`}>
      <p className={classes.explanation__p1}>first step</p>
      <p className={classes.explanation__p2}>second step</p>
      <p className={classes.explanation__p3}>this step</p>
	  </div>

    </div>
  );
};

export default Explanation;
