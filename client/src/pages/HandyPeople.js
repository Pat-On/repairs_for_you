import React from "react";
import HandyPeopleCards from "../components/handyPeopleList/HandyPeopleCards";
import "../components/handyPeopleList/HandyPeopleList.css";
import InputFields from "../components/handyPeopleList/InputFields";


export default function HandyPeople() {

	return (
		<div className="App">
			<header className="card"></header>
			<InputFields />
			<HandyPeopleCards />
		</div>
	);
}
