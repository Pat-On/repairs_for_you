import React from "react";

import classes from "./handymanProfileMain.module.scss";


//TODO: add the alt from where I took this svg!
import user from "../../../../public/user.svg";

/**
 * @DescriptionFunction sub component used by CustomerSection to create the review of users widget which is going to be displayed on main page.
 * @params component is getting object <item> passed though parent component, which contain:
 *  - review: integer
 *  - photo: string which point to directory where is stored picture
 *  - user_name: string with name of the user
 *  - user_surname: string with surname of the user
 *  - comment: comment provided by user regarding service
 */
const HandymanProfileMain = (props) => {
  return (
    <div className={classes.customer}>
      <figure className={classes.customer__figure}>
        <img className={classes.customer__img} src={props.item.photo ? props.item.photo : user} />
        <figcaption className={classes.customer__figcaption}>
          {props.item.first_name} {props.item.last_name}.
        </figcaption>
      </figure>

      <p>{props.item.bio}</p>
    </div>
  );
};

export default HandymanProfileMain;
