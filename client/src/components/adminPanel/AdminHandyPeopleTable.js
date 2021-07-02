import React, { useState, useEffect, useContext } from "react";
import {  useRouteMatch,  Link } from "react-router-dom";
import classes from './AdminPage.module.css'



import AuthContext from "../../store/authContext";

export default function AdminHandyPeopleTable(props) {
	let { path, url } = useRouteMatch();
	const [list, setList] = useState([]);
	

  const authCtx = useContext(AuthContext);
  console.log(authCtx.token);

  const handleChange = (e, oneList) => {

    alert(`are you sure you want to ${e.target.value}`);
    const actionVerb = e.target.value;
    if (actionVerb === "Update") {
      // setChanged(true);
      props.history.push(`${path}/${e.target.id}`);
    } else if (actionVerb === "Activate" || actionVerb === "Deactivate") {
      const newStatus = actionVerb === "Activate" ? true : false;
      fetch(`/api/v1/handyman/handymanprotected/${oneList.id}`, {
        method: "PATCH",
        body: JSON.stringify({ visible: newStatus, id: oneList.id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setChanged(data))
        .catch((err) => console.log(err));

      window.location.reload();
    }
    console.log(oneList);
  };

  useEffect(() => {
    fetch("/api/v1/handyman/handymanprotected", {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
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


	return (
    <table className={classes.table}>

      <thead>
        <tr>
        {/*   <th>
             <input type="checkbox"></input> 
            <p>More</p>
          </th> */}
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
           {/*  <td>
               add here link base on id uf user to the update profile 
               <input type="checkbox"></input> 
              <button>
                <Link to={{ pathname: `${url}/${oneList.id}`, state: oneList }}>
                  View Repair Person
                </Link>
              </button>
            </td> */}

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
                id={oneList.id}
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
  ) 
}
