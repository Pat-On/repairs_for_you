import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";
import UserManagements from "./usersManagements/UsersManagements";
import classes from "./AdminPage.module.css";
import UserDetailedProfile from "./usersManagements/UserDetailedProfile/UserDetailedProfile";
import Adminpage from "./Adminpage";
import AdminButton from "./AdminButton";
import Classes from "./AdminPage.module.css";




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
		<div className={classes.adminpanel}>
			<h1>Welcome to Your admin dashboard</h1>
			{/* <h2>Please chose one of the option</h2> */}
			<h1>What do you want to do next</h1>
			<div className="admin-page-container">
				<AdminButton />
				<Adminpage {...props} />
			</div>

			{/*
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
      */}
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
