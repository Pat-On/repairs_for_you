import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import UserManagements from "./usersManagements/UsersManagements";
import UserDetailedProfile from "./usersManagements/UserDetailedProfile/UserDetailedProfile";

const AdminPanel = (props) => {
  let { path, url } = useRouteMatch();

  /* 
    It need to go to global state
*/

  console.log(path, url);

  return (
    <div>
      <h1>Welcome in Admin Panel</h1>
      <h2>Please chose one of the option</h2>

      <button>
        <Link to={`${url}/usersmanagement`}>Users Management Panel</Link>
      </button>

      <Switch>
        <Route
          path="/"
          exact
          component={() => <h1>You are now In the Admin Panel Component</h1>}
        />
        <Route
          path={`${path}/usersmanagement/:id`}
          component={(props) => <UserDetailedProfile {...props}/>}
        />
        <Route
          path={`${path}/usersmanagement`}
          component={(props) => <UserManagements {...props} />}
        />
      </Switch>
    </div>
  );
};

export default AdminPanel;

// useEffect(() => {
//   fetch(`/api/users/handyman/${id}`)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(res.statusText);
//       }
//       return res.json();
//     })
//     .then((userData) => {
//       setUser(userData);
//     })
//     .catch((err) => {
//       console.error(err);
//       setMessage(err);
//     });
// }, [id]);
