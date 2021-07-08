import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import userDefaultImg from "../../public/user.svg";

export default function handyPeopleCard({ onelist }) {
  const { url } = useRouteMatch();
  return (
    <div className="one-card-container">
      <div className="name-image">
        <Link to={{ pathname: `${url}/${onelist.id}`, state: onelist }}>
          <img className="image" src={userDefaultImg} alt="user profile" />
          <div className="full-name">
            <span className="card-text">{onelist.first_name}</span>
            {"  "}
            <span className="card-text">{onelist.last_name}</span>
          </div>
        </Link>
      </div>
      <div className="bio">
        {onelist.bio.length > 150 ? (
          <p className="card-text">
            {onelist.bio.substring(0, 150)}
            <Link
              to={{ pathname: `${url}/${onelist.id}`, state: onelist }}
              className="see-more"
            >
              &nbsp;...Read more
            </Link>
          </p>
        ) : (
          <p className="card-text">{onelist.bio}</p>
        )}
      </div>
      <Link
        to={{
          pathname: `${url}/${onelist.id}/forms/request-for-quote`,
          state: onelist,
        }}
        className="link-quote"
      >
        <button>Get a Quote</button>
      </Link>
      <Link
        to={{
          pathname: `${url}/${onelist.id}`,
          state: onelist,
        }}
        className="link-profile"
      >
        <button>See Profile</button>
      </Link>

      {onelist.skills.length <= 3 ? (
        <ul className="list-group list-group-flush skills">
          {onelist.skills.map((skill, index) => (
            <li key={index} className="list-group-item">
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="list-group list-group-flush skills">
          {onelist.skills.slice(0, 3).map((skill, index) => (
            <li key={index} className="list-group-item">
              {skill}
            </li>
          ))}
          <li>
            <Link
              to={{
                pathname: `${url}/${onelist.id}`,
                state: onelist,
              }}
              className="see-more"
            >
              ...more
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
