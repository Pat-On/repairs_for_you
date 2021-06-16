import React from "react";
import { Route, Redirect, Switch, useRouteMatch, Link } from "react-router-dom";

const UserManagements = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <li>
      <p> name: {props.user.first_name} </p>{" "}
      <p> name: {props.user.last_name} </p>{" "}
      <p> name: {props.user.user_role} </p>{" "}
      <p> name: {props.user.created_data} </p>{" "}
      <Link to={`${url}/${props.user.user_id}`}> Users Management Panel </Link>{" "}
    </li>
  );
};

export default UserManagements;
