import React, { useState } from "react";
import HandyPeopleCard from "./HandyPeopleCard";
import HandyPeopleTestData from "./HandypeopleTestData.json";



export default function HandyPeopleCards() {
	const 	[list,setList]=useState(HandyPeopleTestData);
	console.log(list);

	return (
		<div className="cards-container">

			{
				list.map((oneList,index)=>

					<HandyPeopleCard key={index} onelist={oneList} />

				)
			}
		</div>
	);
}
