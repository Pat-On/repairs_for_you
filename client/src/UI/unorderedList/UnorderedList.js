import React from "react";

import ListElement from "./listElement/ListElement";

import classes from "./UnorderedList.module.scss";

/**
 * @DescriptionFunction Component responsible for rendering the unordered list created for need of the ConfirmationFormPage component
 * @param {Array of Object} props.formValues [Config object - data needed to render the <ListElement>s]
 */
const unorderedList = (props) => {
  const keyObjectArr = [];
  for (let key in props.formValues) {
    keyObjectArr.push(key);
  }

  const elementsOfList = keyObjectArr.map((key, index) => {
    return (
      <ListElement key={index}>
        <p
          key={props.formValues[key].name}
          className={[classes.listElementsChildrens, classes.bolded].join(" ")}
        >
          {props.formValues[key].name + ":"}
        </p>
        <p
          key={props.formValues[key].value}
          className={classes.listElementsChildrens}
        >
          {props.formValues[key].value}
        </p>
      </ListElement>
    );
  });

  return <ul className={classes.NoneStyle}>{elementsOfList}</ul>;
};

export default unorderedList;
