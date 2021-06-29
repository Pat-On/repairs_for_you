import { useLocation} from "react-router-dom";
import Handyman from "../components/Handyman/Profile/Handyman";

const HandymanProfile = () => {
  const { state } = useLocation();
	return (
    <Handyman userData={state} />
  );
};
export default HandymanProfile;