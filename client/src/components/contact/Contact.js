import React, { useState } from "react";
import { Link,Redirect } from "react-router-dom";
import classes from "./Contact.module.css";
import { send } from "emailjs-com";


export default function Contact() {
	const [isRedirect,setIsRedirect]=useState(false);
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
	alert("Thank you for contacting us! Your message has been sent and we will get back to you soon.")
	setIsRedirect(true);
	};

	return  (
		!isRedirect ?	<div className={classes.contact_container}>
			<div  onSubmit={handleSubmit}>
				<form
					name="form-query"
					className="form"
				>
					<div>
						<div className={classes.contact_text}>
							<h1>Contact Us</h1>
							<hr></hr>
							<p>Got a question, we would love to hear from you.</p>
							<p>Drop us a message and one of our team members will get in touch with you</p>

						</div>
						<div className={classes.contact_info}>
							<p>Tele-+4470000000</p>
							<p>repairsyou@gmail.com</p>
							<a href="https://goo.gl/maps/KaWYzgRdgEwHb9xHA">Coventry refugee and migrant center</a>
						</div>

						<div className={classes.input_fields_container }>
							<div className={classes.name}>
								<label>Name: {" "}</label>
								<input
									type="text"
									name="buyer_name"
									maxLength={60}
									required
									placeholder="Your name "
									onChange={handleChange}
								/>
							</div>
							<div className={classes.email}>
								<label>Email Address: {" "}</label>
								<input
									type="text"
									name="email"
									maxLength={60}
									required
									placeholder="Your email address"
									onChange={handleChange}


								/>
							</div>
							<div className={classes.message}>
								<label> Message: {" "}</label>
								<textarea
									type="text"
									name="message"
									required
									placeholder="Your message here"
									onChange={handleChange}

								/>

							</div>
						</div>



					<div className={classes.button_div}>
						<input
							className={classes.btn_submit}
							type="submit"
							name="buyer_name"
							maxLength={60}
							required
							placeholder="Enter your name here"
							/>
						</div>

					</div>
				</form>


			</div>
			<Link to="/contact"></Link>

		</div> 
		:
		 <Redirect to="/home" />
	);
}
