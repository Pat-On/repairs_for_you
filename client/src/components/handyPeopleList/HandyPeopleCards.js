import React, { useState,useEffect } from "react";
import HandyPeopleCard from "./HandyPeopleCard";
import { Link } from "react-router-dom";
import InputFields from "./InputFields";




export default function HandyPeopleCards() {
	const 	[list,setList]=useState([]);
	const [search,setSearch]= useState();

	const handleChange=(e)=>{
		if(e.target.className==="by-keyword"){
			const	filteredByKeyWord =list.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
			setSearch(filteredByKeyWord);

		}
		if(e.target.className==="by-skill"){
			const	filteredBySkill =list.filter((data) =>  JSON.stringify(data.skills).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
			setSearch(filteredBySkill);

		}

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


	return ( search ? <div className="cards-container">
		<InputFields handleChange={handleChange} />
		{
			search.map((oneList,index)=>

				<HandyPeopleCard key={index} onelist={oneList} />

			)
		}
		<Link to="/about/this/site/handyPeople"></Link>

	</div>
		: <div className="cards-container">
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
