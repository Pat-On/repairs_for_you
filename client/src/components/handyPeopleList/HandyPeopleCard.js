import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import userDefaultImg from "../../public/user.svg";

export default function handyPeopleCard(props) {
  const { onelist } = props;
  console.log(onelist);
  console.log(onelist.first_name);
  const { url, path } = useRouteMatch();
  console.log(url);
  console.log(`${url}/${onelist.handyman_id}`);
  console.log(props.history)
  return (
    <div className="one-card-container">
      <div className="name-image">
        <Link to={`${path}/${onelist.handyman_id}`}>
          {/* <Link to={location => ({ ...location, pathname: `${url}/${onelist.handyman_id}` })} > */}

          <img
            className="image"
            src={userDefaultImg}
            alt="Free icon made by Freepik from www.flaticon.com"
          />
          <div className="full-name">
            {/* temporary solution to make space between the spans - to fix in styling !TODO: */}
            <span className="card-text">{onelist.first_name} </span>
            <span className="card-text">{onelist.last_name}</span>
          </div>
        </Link>
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
