import React, { useState,useEffect } from "react";
import HandyPeopleCard from "./HandyPeopleCard";
import HandyPeopleTestData from "./HandyPeopleTestData.json";
import { Link } from "react-router-dom";
import InputFields from "./InputFields";




export default function HandyPeopleCards() {
	const 	[list,setList]=useState(HandyPeopleTestData);
	const [search,setSearch]= useState();
	const handleChange=(e)=>{
		console.log(e.target.value)
	};

	useEffect(() => {
		fetch("/api/users/handyman")
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
			<InputFields handleChange={handleChange} />
			{
				list.map((oneList,index)=>

					<HandyPeopleCard key={index} onelist={oneList} />

				)
			}
			<Link to="/about/this/site/handyPeople"></Link>

		</div>
	);
}
