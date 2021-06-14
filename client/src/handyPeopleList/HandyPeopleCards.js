import React, { useState } from "react";
import HandyPeopleCard from "./HandyPeopleCard";
import HandyPeopleTestData from "./HandyPeopleTestData.json";



export default function HandyPeopleCards() {
	const 	[list,setList]=useState(HandyPeopleTestData);


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
