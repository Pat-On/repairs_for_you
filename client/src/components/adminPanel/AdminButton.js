import React from "react";
import classes from './AdminPage.module.css'
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";



export default function AdminButton() {
	let { path, url } = useRouteMatch();

	return (

		<div className={classes.admin_page}>
			<button>
				<Link to={`${url}/handyPeople`}>View Repairers</Link>
			</button>
			<button>
				<Link to={`${url}/buyers`}>View Buyers</Link>
			</button>
			<button>
				<Link to={`${url}/buyersrequests`}>View Pending buyer requests</Link>
			</button>
			<button>
				<Link to={`${url}/repairrequest`}>View Pending repairer requests</Link>
			</button>
			
		</div>
	);
}
