import { Link } from "react-router-dom";
import "./Handyman.css";

const Handyman = ({ userData }) => {
	const { id, firstName, lastName, address, skills } = userData;
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
			<Link to={{ pathname:"/forms/request-for-quote",state:data }}>
				<button id="btn-quote" className="btn-primary" >
          Get a Quote
				</button>
			</Link>
			<div className="skills">
				<h3>Skills</h3>
				<ul className="skills-list">
					{userData.skills.map((skill, index) => (
						<li key={index} id={skill.id}>{skill.name}</li>
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
