import React, { useState, useEffect, useContext } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import classes from "./AdminPage.module.css";
import SearchField from "./SearchField";
import AuthContext from "../../store/authContext";

export default function AdminHandyPeopleTable(props) {
  let { path, url } = useRouteMatch();
  const [list, setList] = useState([]);
  const authCtx = useContext(AuthContext);
 

  const handleChange = (e, oneList) => {
    alert(`are you sure you want to ${e.target.value}`);
    const actionVerb = e.target.value;
    if (actionVerb === "Update") {
      props.history.push(`${path}/${e.target.id}`);
    }
    // when action verb is delete

    else if (actionVerb === "Delete") {
      fetch(`/api/v1/handyman/handymanprotected/${e.target.id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: e.target.id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
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
    <div>
      <SearchField/>
 <table className={classes.table}>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">First-name</th>
          <th scope="col">Last-name</th>
          <th scope="col">email</th>
          <th scope="col">Telephone</th>
          <th scope="col">postcode</th>
          <th scope="col">street-name</th>
          <th scope="col">Joined</th>
          <th scope="col">status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      {list.map((oneList, index) => (
        <tbody key={index}>
          <tr>
            <th scope="row">{oneList.id}</th>
            <td>{oneList.first_name}</td>
            <td>{oneList.last_name}</td>

            <td>{oneList.email}</td>
            <td>{oneList.phone_number}</td>
            <td>{oneList.postcode}</td>
            <td>{oneList.address.addressLineTwo}</td>
            <td>day/month/year</td>
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
    </div>
  );
}
