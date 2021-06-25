import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Handyman.css";

import Handyman from "../components/Handyman/Profile/Handyman";

const Handyman = ({ userData }, props) => {
  let { id } = useParams();
const [handyman, setHandyman] = useState({})

  useEffect(() => {
    fetch(`/api/users/handyman/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((userData) => {
        setHandyman(userData);
      })
      .catch((err) => {
        console.error(err);
        // setMessage(err);
      });
  }, [id]);

console.log(handyman)

  const { firstName, lastName, address, skills } = userData;
  const data = { id, firstName, lastName, address, skills };
  return (
    <div className="card handy-man">
      <div className="profile-image-bio">
        <figure className="profile-image">
          <figcaption>{`${userData.firstName} ${userData.lastName}`}</figcaption>
          <img
            src={userData.img}
            alt={`${userData.firstName} ${userData.lastName}`}
          />
          <span className="label">Rating:</span>&nbsp;
          <span className="stars">{userData.rating}&nbsp;stars</span>{" "}
        </figure>
        <div className="bio bio-handy-man">
          <h2>About Me</h2>
          <p>{userData.bio}</p>
        </div>
      </div>
      <Link to={{ pathname: "/forms/request-for-quote", state: data }}>
        <button id="btn-quote">Get a Quote</button>
      </Link>
      <div className="skills">
        <h3>Skills</h3>
        <ul className="skills-list">
          {userData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="user-reviews">
        <span className="label">Reviews:</span>&nbsp;
        <span className="stars">{userData.reviews.length}</span>
        <div>
          <a href="#customer-review">Add a review</a>
        </div>
        {userData.reviews.map((review, index) => (
          <div key={index} className="review">
            <p className="reviewer">{review.name}</p>
            <p className="review-body">{review.body}</p>
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
