import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";




export default function AdminHandyPeopleTable() {
	const 	[list,setList]=useState([]);



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

	return (
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
						<select onChange={()=>alert("are you sure you want to delete")}>
							<option>Update</option>
							<option>Delete</option>
						</select>
					</td>
				</tr>
			</tbody>)}
		</table>


	);
}
