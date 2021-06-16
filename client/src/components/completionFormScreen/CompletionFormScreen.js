import React from "react";

import Button from "../UI/button/Button";

import classes from "./CompletionFormScreen.module.css";

/**
 * @DescriptionFunction Component is responsible to render the completion page
 * which is confirming to user that sign-up form has been sent
 * @param {Function} props.back [function which should redirect user to pointed page. Function is attached to button to "onClick" event]
 */
const confirmationFormPage = (props) => {
  const form = (
    <div className={classes.container}>
      <h1 className={classes.title}>Thank You For Your Submission</h1>
      <p className={classes.subTitle}>
        You will get an email with further instructions.
      </p>
      <div
        className={[
          classes.flexContainerGeneral,
          classes.flexContainerCentered,
        ].join(" ")}
      >
        {props.back && (
          <div className={classes.buttonWrapper}>
            <Button assignedClass={"nextButton"} clicked={props.back}>
              OK
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return form;
};

export default confirmationFormPage;
