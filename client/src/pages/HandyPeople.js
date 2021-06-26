import React from "react";
import HandyPeopleCards from "../components/handyPeopleList/HandyPeopleCards";
import "../components/handyPeopleList/HandyPeopleList.css";


export default function HandyPeople(props) {

	return (
		<div className="App">
			{/* <div className="card"></div> */}
			<HandyPeopleCards {...props}/>
		</div>
	);
}
