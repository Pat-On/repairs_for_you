import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import UserManagements from "./usersManagements/UsersManagements";
import UserDetailedProfile from "./usersManagements/UserDetailedProfile/UserDetailedProfile";


/**
 * @DescriptionFunction Main component of the entire react root in react related to the adminPanel and admins features of managing entire application.
 * This components has implemented 3 sub routes 1 - "/", 2 - "/usersmanagement/:id`" 3: "/usersmanagement" Base url for this routes is "/admin-panel "
 * which is parent route for this component in App.js
 * @link /admin-panel 
 * @access route is going to be protected by authorization on server
 */
const AdminPanel = (props) => {
  let { path, url } = useRouteMatch();

  /* 
    It need to go to global state
*/
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
