import React from "react";

import classes from "./CustomerCommentMain.module.scss";

import fullStart from "../../../../public/starFullColor.svg";
import star from "../../../../public/star.svg";

const imgItem = (link, i) => (
  <img
    className={classes.customer__star}
    key={i}
    src={link}
    alt="Star icon made by Freepik"
  />
);

/**
 * @DescriptionFunction sub component used by CustomerSection to create the review of users widget which is going to be displayed on main page.
 * @params component is getting object <item> passed though parent component, which contain:
 *  - review: integer
 *  - photo: string which point to directory where is stored picture
 *  - user_name: string with name of the user
 *  - user_surname: string with surname of the user
 *  - comment: comment provided by user regarding service
 */
const CustomerCommentMain = (props) => {
  let stars = [];
  for (let i = 0; i < 6; i++) {
    if (i < props.item.review) {
      stars.push(imgItem(fullStart, i));
    }
    if (i > props.item.review) {
      stars.push(imgItem(star, i));
    }
  }
  return (
    <div className={classes.customer}>
      <figure className={classes.customer__figure}>
        <img className={classes.customer__img} src={props.item.photo} />
        <figcaption className={classes.customer__figcaption}>
          {props.item.user_name} {props.item.user_surname[0]}.
        </figcaption>
      </figure>

      <p>{props.item.comment}</p>
      <div className={classes.customer__starContainer}>{stars}</div>
    </div>
  );
};

export default CustomerCommentMain;
