import React, { useEffect, useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../../store/authContext";
import UserAccount from "./userAccount/UserAccount";

/**
 * @DescriptionFunction component which is sub element in relation to AdminPanel component. This component is first component where we can manage users accounts.

 */
const UserManagements = (props) => {
  const [allUsers, SetAllUsers] = useState([]);
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token)

  useEffect(async () => {
    try {
      const allUsersRaw = await fetch("/api/v1/users", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            "Content-Type": 'application/json'
          }
          
      });
      const allUsersFetched = await allUsersRaw.json();

      console.log(allUsersFetched);
      if(allUsersFetched.data) {
        SetAllUsers((prevState) => {
          return (prevState = [...allUsersFetched.data]);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const usersAccounts = allUsers.map((item) => (
    <UserAccount key={item.user_id} user={item} {...props} />
  ));
  if (!allUsers) usersAccount = <p>LOADING</p>;

  return (
    <div>
      <h1>I am lovely UserManagements component</h1>
      {usersAccounts}
    </div>
  );
};

export default UserManagements;
