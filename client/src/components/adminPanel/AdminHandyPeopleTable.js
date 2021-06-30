import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link,useParams } from "react-router-dom";
import UpdateForm from "./UpdateForm";

export default function AdminHandyPeopleTable(props) {
	let { path, url } = useRouteMatch();
	const [list, setList] = useState([]);
	const [changed, setChanged] = useState(false);
	
	const handleChange = (e, oneList) => {
		
		alert(`are you sure you want to ${e.target.value}`);
		if (e.target.value === "Update") {
      // setChanged(true);
      props.history.push(`${path}/${e.target.id}`);
    } else if (e.target.value === "Activate") {
      fetch(`/api/users/handyman/admin/${oneList.id}`, {
        method: "PATCH",
        body: JSON.stringify({ visible: true, id: oneList.id }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json()) //response.json()
        .then((data) => console.log(data));
			window.location.reload();
    } else if (e.target.value === "Deactivate") {
      fetch(`/api/users/handyman/admin/${oneList.id}`, {
        method: "PATCH",
        body: JSON.stringify({ visible: false, id:oneList.id}),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json()) //response.json()
        .then((data) => console.log(data)).catch(err=>console.log(err));
			window.location.reload();
    }
		console.log(oneList);
	};

	useEffect(() => {
		// fetch("/api/users/handyman")
		fetch("/api/users/handyman/admin")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				//!TODO: brutal solution of storing data inside the db as a string - fix it
				const newArray = body.map((item) => {
					return (item = {
						...item,
						// address_offer: JSON.parse(item.address[0]),
					});
				});
				// console.log(newArray);
				// console.log(body.data[0].address_offer[0]);
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

	return !changed ? (
    <table className="table">
      <thead>
        <tr>
          <th>
            {/* <input type="checkbox"></input> */}
            <p>More</p>
          </th>
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
      {list.map((oneList, index) => (
        <tbody key={index}>
          <tr>
            <td>
              {/* add here link base on id uf user to the update profile */}
              {/* <input type="checkbox"></input> */}
              <button>
                <Link to={{ pathname: `${url}/${oneList.id}`, state: oneList }}>
                  View Repair Person
                </Link>
              </button>
            </td>

            <th scope="row">{oneList.id}</th>
            <td>{oneList.first_name}</td>
            <td>{oneList.last_name}</td>

            <td>{oneList.email}</td>
            <td>{oneList.phone_number}</td>
            {/* <td>{oneList.address_offer.city}</td> */}
            <td>{oneList.area}</td>
            <td>{oneList.postcode}</td>
            <td>{oneList.address.addressLineTwo}</td>
            <td>day/month/year</td>
            {/* this will be the date the user was created  */}
            <td>
              completed jobs
              <br></br>
              {/* also possible to make it into two columns */}
              inprogress jobs
            </td>
            <td>{oneList.visible ? "Visible" : "Hidden"}</td>
            <td>
              <select
                id={oneList.handyman_id}
                onChange={(e) => {
                  handleChange(e, oneList);
                }}
              >
                <option>action</option>
                <option>Update</option>
                <option>Delete</option>
                <option>Deactivate</option>
                <option>Activate</option>
              </select>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  ) : (
    <UpdateForm />
  );
}
