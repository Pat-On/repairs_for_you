import React from "react";

import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";

import classes from "./SignUpForm.module.css";

// I left it because we may decide to use logo, but it was not looking good in that version
// import LogoRFY from "../logo/Logo"

/**
 * @DescriptionFunction Component responsible for rendering the sign-up forms including the input fields
 * @param {Function} props.back [function which should return user to previous page. Function is attached to button to "onClick" event]
 * @param {Function} props.next [function which should return user to next page. Function is attached to button to "onClick" event]
 * @param {Function} props.formInputHandler [Reference to function which is responsible to change the value base on upcoming input]
 * @param {Boolean} props.buttonDisable [Boolean value which is responsible for disabling the button]
 * @param {Array of Object} props.form [Array of object containing the unique id and config file needed by Input component]
 */
const signUpForm = (props) => {
  const flexClassStyleArr = [classes.flexContainerGeneral];

  /**
   * If condition which are going to change the CSS classes
   * in relation to how many buttons need to be rendered, base on number of the passed event handlers
   */
  if (props.next && props.back)
    flexClassStyleArr.push(classes.flexContainerCentered);
  if (props.next && !props.back)
    flexClassStyleArr.push(classes.flexContainerToRight);

  const inputForms = props.form.map((item, index) => {
    return (
      <div className={classes.inputContainer} key={item.id}>
        <p className={classes.inputFieldName}>{item.config.name}</p>
        <Input
          id={"input" + index}
          invalid={!item.config.valid}
          shouldValidate={item.config.validation}
          touched={item.config.touched}
          value={item.config.value}
          placeholder={item.config.placeholder}
          formInputHandler={(e) => props.formInputHandler(e, item.id)}
        />
        {!item.config.valid &&
          // props.shouldValidate &&
          item.config.touched && (
            <p className={classes.invalidInputMsg}>
              {item.config.invalidInputInfo}
            </p>
          )}
      </div>
    );
  });

  const buttonsPart = (
    <div className={flexClassStyleArr.join(" ")}>
      {props.back && (
        <div className={classes.buttonWrapper}>
          <Button assignedClass={"backButton"} clicked={props.back}>
            {props.leftButtonName}
          </Button>
        </div>
      )}
      {props.next && (
        <div className={classes.buttonWrapper}>
          <Button
            assignedClass={"nextButton"}
            clicked={props.next}
            buttonDisable={props.buttonDisable}
          >
            {props.rightButtonName}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className={classes.container}>
      {/* <LogoRFY /> */}
      <h1 className={classes.title}>{props.nameOfTheForm}</h1>
      {inputForms}
      {buttonsPart}
    </div>
  );
};

export default signUpForm;
