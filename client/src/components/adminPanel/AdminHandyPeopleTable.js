import React, { useState, useEffect, useContext } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import classes from "./AdminPage.module.css";
import SearchField from "./SearchField";
import AuthContext from "../../store/authContext";
import AdminHandyPeopleTableRows from "./AdminHandyPeopleTableRows";
import { activateDeactivateHandyman } from "../../common/js/functions";

export default function AdminHandyPeopleTable(props) {
  let { path, url } = useRouteMatch();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState([]);
  const authCtx = useContext(AuthContext);

  const handleChange = async (e, oneList) => {
    alert(`are you sure you want to ${e.target.value}`);
    const actionVerb = e.target.value;
    if (actionVerb === "Update") {
      props.history.push(`${path}/${e.target.id}`);
    } else if (actionVerb === "Delete") {
      fetch(`/api/v1/handyman/handymanprotected/${e.target.id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: e.target.id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      window.location.reload();
    } else if (actionVerb === "Activate" || actionVerb === "Deactivate") {
      const newStatus = actionVerb === "Activate" ? true : false;
      const requiredData = { handyman: oneList, newStatus, authCtx };
      const result = await activateDeactivateHandyman(requiredData);
      alert(result.message);
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
      <SearchField list={list} setSearch={setSearch} search={search} />
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
        {search.length > 0
          ? search.map((oneList, index) => (
              <AdminHandyPeopleTableRows
                key={index}
                oneList={oneList}
                handleChange={handleChange}
              />
            ))
          : list.map((oneList, index) => (
              <AdminHandyPeopleTableRows
                key={index}
                oneList={oneList}
                handleChange={handleChange}
              />
            ))}
      </table>
    </div>
  );
}
