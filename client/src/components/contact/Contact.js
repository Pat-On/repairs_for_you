import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import MapComponent from "./MapComponent";
import validateForm from "../../common/js/functions";
import { permittedCrossDomainPolicies } from "helmet";

export default function Contact() {
	const [formDetail,setFormDetail]=useState({
		buyer_name:"",
		email:"",
		message:"",
	});

	const handleChange=(e)=>{
		e.preventDefault();
		setFormDetail({ ...[formDetail],[e.target.name]:e.target.value });/* not completed  */
	};
	const handleSubmit=(e)=>{
		e.preventDefault();
		console.log(formDetail);
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
						<h1>Contact Us</h1>
						<fieldset>
							<span>Got a question, we would love to hear from you.</span>
							<span>  Send us a message and we will respond as soon as possible</span>
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
									<label> Message: {" "}</label>
									<textarea
										type="text"
										id="message"
										name="message"
										maxLength={60}
										required
										placeholder="Enter your message here"
										onChange={handleChange}

									/>
								</div>
							</div>

						</fieldset>

						<div className="input-field">
							<input
								className="btn-submit"
								type="submit"
								id="buyer_name"
								name="buyer_name"
								maxLength={60}
								required
								placeholder="Enter your name here"

							/>
						</div>

					</div>
				</form>
				<MapComponent />

			</div>
			<Link to="/contact"></Link>

		</div>
	);
}
