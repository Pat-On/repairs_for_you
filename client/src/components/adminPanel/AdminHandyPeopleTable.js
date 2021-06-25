import React, { useState,useEffect } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";
import UpdateForm from "./UpdateForm";




export default function AdminHandyPeopleTable() {
	const 	[list,setList]=useState([]);
	const 	[changed,setChanged]=useState(false);


	let { path, url } = useRouteMatch();
	const handleChange=(e)=>{
		if(e.target.value==="Update"){
			setChanged(true);
		}
		alert(`are you sure you want to ${e.target.value}`);
	};


	useEffect(() => {
		fetch("/api/users/handyman")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setList(body);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	console.log(list);

	return   !changed ? (
		<table className="table">
			<thead>
				<tr>
					<th><input type="checkbox"></input></th>
					<th scope="col">Id</th>
					<th scope="col">First-name</th>
					<th scope="col">Last-name</th>
					<th scope="col">email</th>
					<th scope="col">Telephone</th>
					<th scope="col">Area</th>
					<th scope="col">postcode</th>
					<th scope="col">street-name</th>
					<th scope="col">Joined</th>
					<th scope="col">Jobs Done</th>
					<th scope="col">status</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			{ list.map((oneList,index)=>	<tbody key={index}>
				<tr>
					<td><input type="checkbox"></input></td>
					<td >{oneList.id}</td>
					<td>{oneList.firstName}</td>
					<td>{oneList.lastName}</td>
					<td>{oneList.email}</td>
					<td>{oneList.telephone}</td>
					<td>{oneList.address.area}</td>
					<td>{oneList.address.postcode}</td>
					<td>{oneList.address.streetName}</td>
					<td>day/month/year</td>{/* this will be the date the user was created  */}
					<td>
						completed jobs
						<br></br>{/* also possible to make it into two columns */}
						inprogress jobs
					</td>
					<td>{oneList.status}</td>
					<td>
						<select onChange={handleChange}>
							<option>action</option>
							<option>Update</option>
							<option>Delete</option>
							<option>Deactivate</option>
							<option>Activate</option>
						</select>
					</td>
				</tr>
			</tbody>)}
		</table>


	) :<UpdateForm /> ;
}
