import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";

const UserDetailedProfile = (props) => {
  let { path, url } = useRouteMatch();

  const [SingleUser, SetSingleUser] = useState({});
  console.log(path, url);
    const userId = props.match.params.id

  useEffect(async () => {
    try {
      const usersRaw = await fetch(`/api/v1/users/${userId}`);
      const usersFetched = await usersRaw.json();

      console.log(usersFetched)
      SetSingleUser((prevState) => {
        return (prevState = {...usersFetched.data});
      });
    } catch (error) {
        console.log(error.message);
    }
  }, []);

console.log(SingleUser)

  return (
    <div>
      <h1>I am lovely userDetailedProfile component</h1>
    </div>
  );
};

export default UserDetailedProfile;
