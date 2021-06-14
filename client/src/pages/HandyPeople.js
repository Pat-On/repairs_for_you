import React from "react";
import HandyPeopleCards from "../handyPeopleList/HandyPeopleCards";
import "../handyPeopleList/HandyPeopleList.css";
import InputFields from "../handyPeopleList/InputFields";


export default function HandyPeople() {
	return (
		<div className="App">
			<header className="card"></header>
			<InputFields />
			<HandyPeopleCards />
		</div>
	);
}
