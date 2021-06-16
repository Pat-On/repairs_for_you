import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import UserAccount from "./userAccount/UserAccount";

const UserManagements = (props) => {
  const [allUsers, SetAllUsers] = useState([]);

  useEffect(async () => {
    try {
      const allUsersRaw = await fetch("/api/v1/users");
      const allUsersFetched = await allUsersRaw.json();

      console.log(allUsers);
      SetAllUsers((prevState) => {
        return (prevState = [...allUsersFetched.data]);
      });
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
