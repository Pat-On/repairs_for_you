import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function handyPeopleCard({ onelist }) {
	const { url } = useRouteMatch();
	
  return (
    <div className="card">
      <div className="name-image">
        <img className="image" src={onelist.img} alt="profile" />
        <span className="card-text">{onelist.firstName}</span>
        <span className="card-text">{onelist.lastName}</span>
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
      <Link to={`${url}/${onelist.id}`}>Details</Link>
    </div>
  );
}
