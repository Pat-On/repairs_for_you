import React, { useState, useEffect } from "react";
import HandyPeopleCard from "./HandyPeopleCard";
import { Link } from "react-router-dom";

export default function HandyPeopleCards() {
  const [list, setList] = useState();
  const [message, setMessage] = useState("Loading...");

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
				setMessage(err);
      });
  }, []);

  return !list ? (
    <h1 className="loading message-loading">{message}</h1>
  ) : (
    <div className="cards-container">
      {list.map((oneList, index) => (
        <HandyPeopleCard key={index} onelist={oneList} />
      ))}

      <Link to="/about/this/site/handyPeople"></Link>
    </div>
  );
}
