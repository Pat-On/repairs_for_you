import React from "react";
import classes from "./AdminPage.module.css";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import AdminHandyPeopleTable from "./AdminHandyPeopleTable";
import UpdateForm from "./UpdateForm";
export default function Adminpage(props) {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route
          path={`${url}/handyPeople`}
          exact
          render={(props) => <AdminHandyPeopleTable {...props} />}
        />

        <Route
          path={`${url}/handyPeople/:id`}
          component={(props) => <UpdateForm {...props} />}
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
