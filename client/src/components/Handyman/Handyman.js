import "./Handyman.css";

const Handyman = ({ userData }) => {
	return (
		<div className="card handy-man">
			<figure className="profile-image">
				<img src={userData.img} alt={`${userData.firstName} ${userData.lastName}`} />
				<figcaption>{`${userData.firstName} ${userData.lastName}`}</figcaption>
			</figure>
			<div className="ratings">
				<span className="label">Rating:</span>&nbsp;
				<span className="stars">{userData.rating}&nbsp;stars</span>{" "}
				<span className="label">Reviews:</span>&nbsp;
				<span className="stars">{userData.reviews.length}</span>
			</div>
			<div className="skills">
				<h3>Skills</h3>
				<ul className="skills-list">
					{userData.skills.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</ul>
			</div>
			<div className="bio bio-handy-man">
				<h2>About Me</h2>
				<p>{userData.bio}</p>
			</div>
			<div className="user-reviews">
				<h2>Reviews</h2>
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
