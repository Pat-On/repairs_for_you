import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./HandyMan.css";

const HandyMan = ({ id }) => {
	// id = 3;
	const [user, setUser] = useState();
	const [message, setMessage] = useState("Loading...");
	useEffect(() => {
		fetch(`/api/users/handyman/profile/${id}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((userData) => {
				console.log(userData);
				setUser(userData);
			})
			.catch((err) => {
				console.error(err);
				setMessage(err);
			});
	}, [id]);

	return !user ? (
		<h1 className="loading message-loading">{message}</h1>
	) : (
		<div className="card handy-man">
			<Header />
			<figure className="profile-image">
				<img src={user.img} alt={`${user.firstName} ${user.lastName}`} />
				<figcaption>{`${user.firstName} ${user.lastName}`}</figcaption>
			</figure>
			{/* <div className="details details-hand-man"> */}
			{/* <h1>{`${user.firstName} ${user.lastName}`}</h1> */}
			<div className="ratings">
				<span className="label">Rating:</span>&nbsp;
				<span className="stars">{user.rating}&nbsp;stars</span>{" "}
				<span className="label">Reviews:</span>&nbsp;
				<span className="stars">{user.reviews.length}</span>
			</div>
			<div className="skills">
				<h3>Skills</h3>
				<ul className="skills-list">
					{user.skills.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</ul>
			</div>
			{/* </div> */}
			<div className="bio bio-handy-man">
				<h2>About Me</h2>
				<p>{user.bio}</p>
			</div>
			<div className="user-reviews">
				<h2>Reviews</h2>
				<div>
					<a href="#customer-review">Add a review</a>
				</div>
				{user.reviews.map((review, index) => (
					<div key={index} className="review">
						<p className="reviewer">{review.name}</p>
						<p className="review-body">{review.body}</p>
					</div>
				))}
				<form id="form-review" onSubmit={()=>{}}>
					<label htmlFor="customer-review">Your Review</label>
					<input type="text-area" id="customer-review" name="customer-review" placeholder="Enter your review here..." />
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
export default HandyMan;
