import React, { useContext, useEffect } from "react";
import AuthContext from "../../store/authContext";

const SignOut = (props) => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.logout();
    props.history.push("/");
  }, []);

  return <div>WWe can add here loading spinner</div>;
};

export default SignOut;
