import { Link } from "react-router-dom";
import "./Handyman.css";

import userDefaultImg from "../../../public/user.svg"

const Handyman = ({userData}) => {

  console.log(userData.data)
  const { handyman_id, first_name, last_name, address, skills, bio } = userData.data;
  const data = { handyman_id, first_name, last_name, address, skills  };
  return (
    <div className="card handy-man">
      <div className="profile-image-bio">
        <figure className="profile-image">
          <figcaption>{`${userData.data.first_name} ${userData.data.last_name}`}</figcaption>
          <img
            src={userData.data.img ? userData.data.img : userDefaultImg}
            alt={`${userData.data.first_name} ${userData.data.last_name}`}
          />
          <span className="label">Rating:</span>&nbsp;
          <span className="stars">{userData.data.rating}&nbsp;stars</span>{" "}
        </figure>
        <div className="bio bio-handy-man">
          <h2>About Me</h2>
          <p>{userData.data.bio}</p>
        </div>
      </div>
      <Link to={{pathname:"/forms/request-for-quote", state:data}}>
        <button id="btn-quote" >
          Get a Quote
        </button>
      </Link>
      <div className="skills">
        <h3>Skills</h3>
        <ul className="skills-list">
          {userData.data.skills.map((skill, index) => (
            <li key={index} >{skill}</li>
          ))}
        </ul>
      </div>

      <div className="user-reviews">
        <span className="label">Reviews:</span>&nbsp;
        {/* <span className="stars">{userData.reviews.length}</span> */}
        <div>
          <a href="#customer-review">Add a review</a>
        </div>
        {userData.reviews? userData.reviews.map((review, index) => (
          <div key={index} className="review">
            <p className="reviewer">{review.name}</p>
            <p className="review-body">{review.body}</p>
          </div>
        )) : <h2>No reviews was received</h2>}
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
