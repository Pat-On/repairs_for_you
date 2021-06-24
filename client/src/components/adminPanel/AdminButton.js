import React from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

export default function AminButton() {
	let { path, url } = useRouteMatch();

	return (

		<div className="admin-page">
			<button>
				<Link to={`${url}/users/handyman`}>Repair Person</Link>
			</button>
			<button>
				<Link to={`${url}/users/buyers`}>Clients</Link>
			</button>
		</div>
	);
}
