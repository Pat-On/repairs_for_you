import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";

const UserDetailedProfile = (props) => {
  let { path, url } = useRouteMatch();

  const [singleUser, setSingleUser] = useState();
  console.log(path, url);
  const userId = props.match.params.id;

  console.log(userId)
  useEffect(async () => {
    try {
      const userRaw = await fetch(`/api/v1/users/${userId}`);
      const userFetched = await userRaw.json();

      console.log(userFetched);
      setSingleUser((prevState) => ({
        ...prevState,
        ...userFetched.data
      }));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  console.log(singleUser);
  let user = <h1>Loading</h1>;

  if (singleUser) {
    user = (
      <div>
        <p> first name: {singleUser.first_name} </p>
        <p> last name: {singleUser.last_name} </p>
        <p> user role: {singleUser.user_role} </p>
        <p> created at: {singleUser.created_data} </p>
        {/* {singleUser.skills.map((item) => (
          <span>item</span>
        ))} */}
      </div>
    );
  }

  return (<div>{ user }</div>);
};

export default UserDetailedProfile;
