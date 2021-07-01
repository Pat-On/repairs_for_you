import { Link, useRouteMatch } from "react-router-dom";
import "./Handyman.css";

import userDefaultImg from "../../../public/user.svg"; // WARN: TEMPORARY SOLUTION
import { useEffect, useState } from "react";

const Handyman = ({ userData }) => {
  const [reviews, setReviews] = useState([]);

  const { id, first_name, last_name, address, area, skills } = userData;
  const data = { id, first_name, last_name, address, area, skills };
  const { url } = useRouteMatch();

  useEffect(() => {
    fetch(`/api/users/handyman/${id}/reviews`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="card handy-man">
      <div className="profile-image-bio">
        <figure className="profile-image">
          <figcaption>{`${userData.first_name} ${userData.last_name}`}</figcaption>
          <img
            src={userDefaultImg} // WARN: TEMPORARY SOLUTION
            alt={`${userData.first_name} ${userData.last_name}`}
          />
          <span className="label">Rating:</span>&nbsp;
          <span className="stars">{userData.rating}&nbsp;stars</span>{" "}
        </figure>
        <div className="bio bio-handy-man">
          <h2>About Me</h2>
          <p>{userData.bio}</p>
        </div>
      </div>
      <Link to={{ pathname: `${url}/forms/request-for-quote`, state: data }}>
        <button id="btn-quote">Get a Quote</button>
      </Link>
      <div className="skills">
        <h3>Skills</h3>
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="user-reviews">
        <span className="label">Reviews:</span>&nbsp;
        {reviews && <span className="stars">{reviews.length}</span>}
        <div>
          <a href="#customer-review">Add a review</a>
        </div>
        {reviews &&
          reviews.map((review, index) => (
            <div key={index} className="review">
              {/* WARN: TEMPORARY SOLUTION */}
              {/* <p className="reviewer">{review.name}</p> */}
              <p className="review-body">{review.review_body}</p>
              <br />
            </div>
          ))}
        <form id="form-review" onSubmit={() => {}}>
          <label htmlFor="customer-review">Your Review</label>
          <input
            type="text-area"
            id="customer-review"
            name="customer-review"
            placeholder="Enter your review here..."
          />
          <input
            type="submit"
            id="add-review"
            name="add-review"
            value="Send Review"
          />
        </form>
      </div>
    </div>
  );
};
export default Handyman;
