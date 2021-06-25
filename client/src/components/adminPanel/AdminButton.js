import React from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

export default function AminButton() {
	let { path, url } = useRouteMatch();

	return (

		<div className="admin-page">
			<button>
				<Link to={`${url}/handyPeople`}>View Repair Person</Link>
			</button>
			<button>
				<Link to={`${url}/buyers`}>View Buyers</Link>
			</button>
			<button>
				<Link to={`${url}/buyersrequests`}>View Pending buyer requests</Link>
			</button>
			<button>
				<Link to={`${url}/repairrequest`}>View Pending repair person requests</Link>
			</button>
			
		</div>
	);
}
