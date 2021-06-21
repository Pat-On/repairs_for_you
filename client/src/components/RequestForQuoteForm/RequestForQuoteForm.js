import { useState } from "react";
import "./RequestForQuoteForm.css";
import Skills from "../Handyman/SubComponents/Skills";
import { validateForm, sendQuoteRequest } from "../Handyman/functions";
import { send } from "emailjs-com";


const RequestForQuoteForm = (props) => {
	const [quotaDetails,setQuotaDetails]=useState({
		buyer_name:"",
		email:"",
		phone_number:"",
		job_description:"",
		date_start:"",
		man_hours:"",
		price:"",
	});
	const data = props.data.location.state;
	const [errors, setErrors] = useState([]);

	// EVENT HANDLERS
	const sendFormData = (event) => {
		event.preventDefault();
		send(
			"service_l0m5rpd",
			"template_elv94vx",
			quotaDetails,
			"user_Z6650OqueHooRxmmi5Geo"
		)
			.then((response) => {
				console.log("SUCCESS!", response.status, response.text);
			})
			.catch((err) => {
				console.log("FAILED...", err);
			});

	};
	const handleChange=(e)=>{
		console.log(e.target.value);
		setQuotaDetails({ ...quotaDetails, [e.target.name]: e.target.value });
		console.log(quotaDetails);
	};
	return (
		<form
			id="form-send-quote"
			name="form-send-quote"
			className="form"
			onSubmit={sendFormData}
		>
			{errors.map((e, index) => (
				<p key={index} className="error">
					{e}
				</p>
			))}
			<h1 className="title">Request For Quote</h1>
			<em className="required">
				<span className="required">*</span>&nbsp;Required field
			</em>
			<div className="">
				<h2>Handyman Details</h2>
				<p>
          Handyman Name: <span>{data.firstName}</span>{" "}
					<span>{data.lastName}</span>
				</p>
				<p>
          Area: <span>{data.address.area}</span>
				</p>
			</div>
			<div>
				<fieldset className="input-field-group job-details">
					<legend className="subtitle">Contact Details</legend>
					<div className="input-field">
						<label htmlFor="first-name">Your Name</label>
						<span className="required">*</span>&nbsp;
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
						<label htmlFor="email">Your Email</label>
						<span className="required">*</span>&nbsp;
						<input
							type="email"
							id="email"
							name="email"
							maxLength={50}
							required
							placeholder="someone@example.com"
							onChange={handleChange}

						/>
					</div>
					<div className="input-field">
						<label htmlFor="phone-number">Phone Number (optional)</label>{" "}
						<input
							type="tel"
							id="phone_number"
							name="phone_number"
							maxLength={13}
							onChange={handleChange}

						/>
					</div>
				</fieldset>
			</div>
			<fieldset className="input-field-group job-details">
				<legend className="subtitle">Job Details</legend>
				<div className="input-field-group">
					<div className="input-field">
						<h3>
              Description
							<span className="required">*</span>&nbsp;
						</h3>
						<textarea
							id="job-description"
							name="job_description"
							maxLength={1000}
							required
							placeholder="Short summary of the job"
							onChange={handleChange}

						></textarea>
					</div>
					<div className="handyman-skills">
						<h3>Required Skill(s) (optional)</h3>
						<Skills skills={data.skills} />
					</div>
					<div className="input-field">
						<label htmlFor="date-start">Expected Start Date</label>
						<span className="required">*</span>&nbsp;
						<input
							type="date"
							id="date-start"
							name="date_start"
							required
							onChange={handleChange}

						/>
					</div>
					<div>
						<h3>Additional Information</h3>
						<em className="required">
              Please provide at least one of the following additional
              information:
						</em>
						<div className="input-field">
							<label htmlFor="job-duration-days">Estimated Man-hours:</label>{" "}
							<input type="number" id="man-hours" name="man_hours"  onChange={handleChange} />
						</div>
						<div className="input-field">
							<label htmlFor="price">Willing to Pay £</label>{" "}
							<input type="number" id="price" name="price"   onChange={handleChange} />
						</div>
					</div>
				</div>
			</fieldset>
			<div className="submit-button-div">
				<input type="submit" id="btn-submit" name="btn-submit" value="Submit" />
			</div>
		</form>
	);
};

export default RequestForQuoteForm;
