import React from "react";

import classes from "./Input.module.scss";

/**
 * @DescriptionFunction Simple Input component which has dynamic style to emphasize wrong input
 */
const input = (props) => {
  const inputCSSClasses = [classes.inputClass];
  /**
   * If condition which are going to change the CSS classes
   * CSS class Invalid is going to emphasize incorrect input
   */
  if (props.invalid && props.shouldValidate && props.touched) {
    inputCSSClasses.push(classes.Invalid);
  }
  if (props.incorrectEmOrPass) {
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
