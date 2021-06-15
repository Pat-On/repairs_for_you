import React, { useState,useEffect } from "react";
import HandyPeopleCard from "./HandyPeopleCard";
import HandyPeopleTestData from "./HandyPeopleTestData.json";
import { Link } from "react-router-dom";




export default function HandyPeopleCards() {
	const 	[list,setList]=useState(HandyPeopleTestData);

	useEffect(() => {
		fetch("/api/handyPeople")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setList(body);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);


	return (
		<div className="cards-container">

			{
				list.map((oneList,index)=>

					<HandyPeopleCard key={index} onelist={oneList} />

				)
			}
			<Link to="/about/this/site/handyPeople">HandyPeople</Link>

		</div>
	);
}
