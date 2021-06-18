import React from "react";

import classes from "./Button.module.css";

/**
 * @DescriptionFunction Simple component - part of UI
 * @param {String} props.assignedClass [Simple string which is giving to chance to assign custom CSS class]
 * @param {String} props.children [Are use to provide the description of button]
 * @param {Function} props.clicked [Function which is going to handle onClick event]
 * @param {Boolean} props.buttonDisable [boolean value disabling button]
 */
const button = (props) => {
  let button = (
    <button
      className={[classes.Button, classes[props.assignedClass]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );

  if (props.buttonDisable) {
    button = (
      <button
        disabled
        className={[classes.Button, classes[props.assignedClass]].join(" ")}
        onClick={props.clicked}
      >
        {props.children}
      </button>
    );
  }

  return button;
};

export default button;
