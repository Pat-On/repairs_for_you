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
            REPAIRS FOR YOU

          </span>
          <span className={classes.primary__heading__sub}>WE FIX IT RIGHT</span>
        </h1>
        <Link
          to="/users/handyman/register"
          className={`${classes.primary__button} ${classes.primary__button__publish}`}
        >
          Become Handyperson
				</Link>
				<Link
					to="/login"
					className={`${classes.primary__button} ${classes.primary__button__hire}`}
				>
          Sign Up
				</Link>
			</div>
		</div>
	);
};

export default PrimarySection;