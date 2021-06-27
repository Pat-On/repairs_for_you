import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Handyman from "../components/Handyman/Profile/Handyman";

const HandymanProfile = (props) => {

const {id} = useParams()
console.log(id)
	const [user, setUser] = useState();
	const [message, setMessage] = useState("Loading...");
	useEffect(() => {
		fetch(`/api/users/handyman/${id}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((userData) => {
				setUser(userData);
			})
			.catch((err) => {
				console.error(err);
				setMessage(err);
			});
	}, [id]);

	return !user ? (
		<h1 className="loading message-loading">{message}</h1>
	) : (
		<Handyman userData={user} />
	);
};
export default HandymanProfile;
