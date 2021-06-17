import React from "react";

import classes from "./ListElement.module.css";

const listElement = (props) => {
  const classList = [classes.liConfElement];

  if (props.bolded) classList.push(classes.bolded);

  return <li className={classList.join(" ")}>{props.children}</li>;
};

export default listElement;
