import React from "react";
import "./AdminPage.css";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";
import AdminHandyPeopleTable from "./AdminHandyPeopleTable";

export default function Adminpage(props) {
	let { path, url } = useRouteMatch();

	return (

		<div>
			<Switch>
				<Route
					path={`${url}/users/handyman`}
					exact
					component={(props) => <AdminHandyPeopleTable {...props} />   }
				/>

			</Switch>

		</div>


	);
}
