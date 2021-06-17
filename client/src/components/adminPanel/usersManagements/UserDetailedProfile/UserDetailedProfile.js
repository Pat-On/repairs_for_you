import React, { useEffect, useState } from "react";


/**
 * @DescriptionFunction Component which is used in UsersManagement component to provide to admin graphical representation of users data. 
 * Base on it, admin can chose user and decide the next steps
 */
const UserDetailedProfile = (props) => {

  const [singleUser, setSingleUser] = useState("");
  const userId = props.match.params.id;


  useEffect(async () => {
    try {
      const userRaw = await fetch(`/api/v1/users/${userId}`);
      const userFetched = await userRaw.json();

      console.log(userFetched);
      setSingleUser((prevState) => ({
        ...prevState,
        ...userFetched.data
      }));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  console.log(singleUser);
  let user = <h1>Loading</h1>;

  if (singleUser) {
    user = (
      <div>
        <p> first name: {singleUser.first_name} </p>
        <p> last name: {singleUser.last_name} </p>
        <p> user role: {singleUser.user_role} </p>
        <p> created at: {singleUser.created_data} </p>
      </div>
    );
  }

  return (<div>{ user }</div>);
};

export default UserDetailedProfile;
