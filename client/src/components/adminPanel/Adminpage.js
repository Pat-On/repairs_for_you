import React from "react";
import "./AdminPage.css";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";
import AdminHandyPeopleTable from "./AdminHandyPeopleTable";
import TemporaryEditForm from "./usersManagements/temporaryEditForm/TemporaryEditForm"
import UpdateForm from "./UpdateForm"
export default function Adminpage(props) {
  let { path, url } = useRouteMatch();
//   console.log(url);
//   console.log(path);
console.log(props.match)
  return (
    <div>
      <Switch>
        <Route
          path={`${url}/handyPeople`}
          exact
          render={(props) => <AdminHandyPeopleTable {...props} />}
        />

        <Route
          path={`${path}/handyPeople/:id`}
          component={(props) => <UpdateForm {...props}/>}
        />

        <Route
          path={`${url}/buyersrequests`}
          render={(props) => <p>BUYERS Requests</p>}
        />
        <Route path={`${url}/buyers`} component={(props) => <p>BUYERS</p>} />
        <Route
          path={`${url}/repairrequest`}
          render={(props) => <p>Repairs Requests</p>}
        />
      </Switch>
    </div>
  );
}
