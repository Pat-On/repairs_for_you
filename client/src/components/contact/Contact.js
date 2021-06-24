import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import validateForm from "../../common/js/functions";
import { permittedCrossDomainPolicies } from "helmet";
import { send } from "emailjs-com";

export default function Contact() {
	const [formDetail,setFormDetail]=useState({
		buyer_name:"",
		email:"",
		message:"",
	});

	const handleChange=(e)=>{
		e.preventDefault();
		setFormDetail({
			...formDetail,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit=(e)=>{
		e.preventDefault();
		console.log(formDetail);
		send( "service_l0m5rpd",
			"template_ybb8yxc",
			formDetail,
			"user_Z6650OqueHooRxmmi5Geo",);
	};

	return (
		<div className="contact-container">
			<div className="map-form" onSubmit={handleSubmit}>
				<form
					id="form-send-quote"
					name="form-send-quote"
					className="form"
				>
					<div>
						<div className="contact-text">
							<h1>Contact Us</h1>
							<p>Got a question, we would love to hear from you.</p>
							<p>Drop us a message and one of our team members will get in touch with you</p>

						</div>
						<div className="contact-info">
							<p>Tele-+4470000000</p>
							<p>repairsyou@gmail.com</p>
							<a href="https://goo.gl/maps/KaWYzgRdgEwHb9xHA">Coventry refugee and migrant center</a>
						</div>

						<div className="input-fields-container">
							<div className="input-field">
								<label>Name: {" "}</label>
								<input
									type="text"
									id="buyer_name"
									name="buyer_name"
									maxLength={60}
									required
									placeholder="Enter your name here"
									onChange={handleChange}
								/>
							</div>
							<div className="input-field">
								<label>Email Address: {" "}</label>
								<input
									type="text"
									id="email"
									name="email"
									maxLength={60}
									required
									placeholder="Enter your email here"
									onChange={handleChange}


								/>
							</div>
							<div className="message">
								<label> Message: {" "}</label><span><textarea
									type="text"
									id="message"
									name="message"
									required
									placeholder="Enter your message here"
									onChange={handleChange}

								/></span>

							</div>
						</div>



						<div className="input-field">
							<input
								className="btn-submit"
								type="submit"
								id="buyer_name"
								name="submit"
								maxLength={60}
								required
								placeholder="Enter your message here"

							/>
						</div>

					</div>
				</form>


			</div>
			<Link to="/contact"></Link>

		</div>
	);
}
