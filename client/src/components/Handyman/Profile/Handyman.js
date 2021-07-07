import { Link, useRouteMatch } from "react-router-dom";
import "./Handyman.css";

import userDefaultImg from "../../../public/user.svg"; // WARN: TEMPORARY SOLUTION
// import { useEffect, useState } from "react"; WARN: INTENDED FOR FUTURE USE

const Handyman = ({ userData }) => {
  // const [reviews, setReviews] = useState([]); WARN: CURRENTLY NOT BEING USED. INCLUDED HERE IN LIGHT OF PROBABLE FUTURE NEEDS

  const { id, first_name, last_name, address, area, skills } = userData;
  const data = { id, first_name, last_name, address, area, skills };
  const { url } = useRouteMatch();

  // WARN: COMMENTED OUT CODE BELOW IS HOPED TO BE USED AS PART OF FUTURE SITE IMPROVEMENTS
  // useEffect(() => {
  //   fetch(`/api/v1/handyman/handymannotprotected/${id}/reviews`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(res.statusText);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setReviews(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [id]);

  return (
    <div className="handyman">
      {/* <div className="profile-image-bio"> */}
      <figure>
        <img
          className="profile-image"
          src={userDefaultImg} // WARN: TEMPORARY SOLUTION
          alt={`${userData.first_name} ${userData.last_name}`}
        />
        <figcaption>
          <p className="handyman-name">{`${userData.first_name} ${userData.last_name}`}</p>

          {/* NOTE: COMMENTED OUT SECTION BELOW IS HOPED TO BE PART OF FUTURE SITE IMPROVEMENTS */}

          {/* <p>
              <span className="label">Rating:</span>&nbsp;
              <span className="stars">{userData.rating}&nbsp;stars</span>
            </p> */}
        </figcaption>
      </figure>
      <Link
        to={{ pathname: `${url}/forms/request-for-quote`, state: data }}
        className="link-btn-quote top-link"
      >
        <button id="btn-quote">Get a Quote</button>
      </Link>
      <div className="bio-handyman">
        <h2>About Me</h2>
        <p>{userData.bio}</p>
      </div>
      {/* </div> */}
      <div className="skills">
        <h3>My Skills</h3>
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <Link
        to={{ pathname: `${url}/forms/request-for-quote`, state: data }}
        className="link-btn-quote buttom-link"
      >
        <button id="btn-quote">Get a Quote</button>
      </Link>

      {/* NOTE: COMMENTED OUT SECTION BELOW IS HOPED TO BE PART OF FUTURE SITE IMPROVEMENTS */}

      {/* <div className="user-reviews">
        <span className="label">Reviews:</span>&nbsp;
        {reviews && <span className="stars">{reviews.length}</span>}
        <div>
          <a href="#customer-review">Add a review</a>
        </div>
        {reviews &&
          reviews.map((review, index) => (
            <div key={index} className="review">
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

      </div> */}
    </div>
  );
};
export default Handyman;
