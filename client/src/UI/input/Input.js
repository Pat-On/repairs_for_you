import React from "react";

import classes from "./Input.module.css";

/**
 * @DescriptionFunction Simple Input component which has dynamic style to emphasise wrong input
 */
const input = (props) => {
  const inputCSSClasses = [classes.inputClass];

  /**
   * If condition which are going to change the CSS classes
   * CSS class Invalid is going to emphasise incorrect input
   */
  if (props.invalid && props.shouldValidate && props.touched) {
    inputCSSClasses.push(classes.Invalid);
  }
  const inputItem = (
    <input
      className={inputCSSClasses.join(" ")}
      placeholder={props.placeholder}
      onChange={props.formInputHandler}
      value={props.value}
      {...props.elementConfig}
    />
  );

  return inputItem;
};

export default input;
