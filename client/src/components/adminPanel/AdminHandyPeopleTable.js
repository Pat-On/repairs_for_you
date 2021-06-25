import React, { useState,useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";




export default function AdminHandyPeopleTable(props) {
	const 	[list,setList]=useState([]);

console.log(list)

	useEffect(() => {
		// fetch("/api/users/handyman")
		fetch("/api/users/handyman/adminsacceshandymans")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {

				//!TODO: brutal solution of storing data inside the db as a string - fix it
				const newArray = body.data.map(item => {
					return item = {
						...item,
						address_offer: JSON.parse(item.address_offer[0])
					}
				})
				console.log(newArray)
				console.log(body.data[0].address_offer[0])
				setList(newArray);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	
	// const addressObj = {}
	// if (list[0]) {
	// console.log(JSON.parse(list[0].address_offer[0]));
	// }

	// // Parsing address from DB 
	// const newArray = list.map(item => {
	// 	return item = {
	// 		...item,
	// 		address_offer: JSON.parse(item.address_offer[0])
	// 	}
	// })
	// setList(newArray)


const table = (
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
				<th scope="row">{oneList.handyman_id}</th>
				<td>{oneList.first_name}</td>
				<td>{oneList.last_name}</td>
				<td>{oneList.email}</td>
				<td>{oneList.phone_number}</td>
				<td>{oneList.address_offer.city}</td>
				<td>{oneList.postcode}</td>
				<td>{oneList.address_offer.addressLineOne}</td>
				<td>day/month/year</td>{/* this will be the date the user was created  */}
				<td>
					completed jobs
					<br></br>{/* also possible to make it into two columns */}
					inprogress jobs
				</td>
				<td>{oneList.visible ? "Visible" : "Hidden" }</td>
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


	return (

      <Switch>
        <Route
          path="/"
          component={() => table}
        />
        {/* <Route
          path={`${path}/:id`}
          component={(props) => <UserDetailedProfile {...props}/>}
        /> */}
      </Switch>
      
	)
}
