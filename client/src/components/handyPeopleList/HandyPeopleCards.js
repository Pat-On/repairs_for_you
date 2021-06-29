import React, { useState, useEffect } from "react";
import HandyPeopleCard from "./HandyPeopleCard";
import InputFields from "./InputFields";

export default function HandyPeopleCards() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState();

  const handleChange = (e) => {
    if (e.target.className === "by-keyword") {
      const filteredByKeyWord = list.filter(
        (data) =>
          JSON.stringify(data)
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) !== -1
      );
      setSearch(filteredByKeyWord);
    }
    if (e.target.className === "by-skill") {
      const filteredBySkill = list.filter(
        (data) =>
          JSON.stringify(data.skills)
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) !== -1
      );
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
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return !list && !search ? (
    <h1 className="message">Loading, please wait...</h1>
  ) : (
    <div className="cards-container">
      <InputFields handleChange={handleChange} />
      {/* during search/filter action... */}
      {search && search.length > 0 ? (
        //if the action returned some results
        <div>
          {search.length < list.length ? (
            <p className="message results-found-message">{`Found ${search.length} result(s) matching your criteria.`}</p>
          ) : (
            <p className="message results-found-message">{`${list.length} result(s) found.`}</p>
          )}
          {/* {display the list of handymen found} */}
          {search.map((oneList, index) => (
            <HandyPeopleCard key={index} onelist={oneList} />
          ))}
        </div>
      ) : search && search.length === 0 ? (
        // if there are no search results, display 'No results found' message
        <p className="message no-results-found-message">
          {`No results found matching the criteria.`}
        </p>
      ) : (
        // default: display list of all handymen
        <div>
          <p className="message results-found-message">{`${list.length} result(s) found.`}</p>
          {list.map((oneList, index) => (
            <HandyPeopleCard key={index} onelist={oneList} />
          ))}
        </div>
      )}
    </div>
  );
}
