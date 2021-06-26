import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import userDefaultImg from "../../public/user.svg"

export default function handyPeopleCard({ onelist }) {

	console.log(onelist)
	console.log(onelist.first_name)
	const { url } = useRouteMatch();
	
	return (
		<div className="one-card-container">
			<div className="name-image">
				<a href={`${url}/${onelist.handyman_id}`}>
					<img className="image" src={userDefaultImg} alt="Free icon made by Freepik from www.flaticon.com" />
					<div className="full-name">
						{/* temporary solution to make space between the spans - to fix in styling !TODO: */}
					<span className="card-text">{onelist.first_name}  </span>
					<span className="card-text">{onelist.last_name}</span>
					</div>
					
				</a>

			</div>
			<div className="bio">
				<p className="card-text">{onelist.bio}</p>
			</div>

			<ul className="list-group list-group-flush">
				{onelist.skills.map((skill, index) => (
					<li key={index} className="list-group-item">
						{skill}
					</li>
				))}
			</ul>
		</div>
	);
}
