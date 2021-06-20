import React from "react";
import { useRouteMatch } from "react-router-dom";

export default function handyPeopleCard({ onelist }) {
	const { url } = useRouteMatch();

	return (
		<div className="one-card-container">
			<div className="name-image">
				<a href={`${url}/${onelist.id}`}>
					<img className="image" src={onelist.img} alt="user profile" />
					<div className="full-name">
					<span className="card-text">{onelist.firstName}</span>
					{"  "}
					<span className="card-text">{onelist.lastName}</span>
					</div>
					
				</a>

			</div>
			<div className="bio">
				<p className="card-text">{onelist.bio}</p>
			</div>

			<ul className="list-group list-group-flush">
				{onelist.skills.map((skill, index) => (
					<li key={index} id={skill.id} className="list-group-item">
						{skill.name}
					</li>
				))}
			</ul>
		</div>
	);
}
