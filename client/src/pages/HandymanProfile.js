import { Redirect, useLocation } from "react-router-dom";
import Handyman from "../components/Handyman/Profile/Handyman";

const HandymanProfile = () => {
  const { state } = useLocation();
  return state ? <Handyman userData={state} /> : <Redirect to="/" />;
};
export default HandymanProfile;