import React from "react";
import { Route, Redirect, Switch, useRouteMatch, Link } from "react-router-dom";


/**
 * @DescriptionFunction Detailed profile of user where admin can use his privileges 
 * !TODO: this component is not implemented, regarding functionality it is like placeholder
 */
const UserManagements = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <li>
      <p> first name: {props.user.first_name} </p>{" "}
      <p> last name: {props.user.last_name} </p>{" "}
      <p> user role: {props.user.user_role} </p>{" "}
      <p> created at: {props.user.created_data} </p>{" "}
      <Link to={`${url}/${props.user.user_id}`}> Users Management Panel </Link>{" "}
    </li>
  );
};

export default UserManagements;
