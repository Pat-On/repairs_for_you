import { useState } from "react";
import "./RequestForQuoteForm.css";
import Skills from "./Skills";
import { validateForm, sendQuoteRequest } from "../../common/js/functions";
import { useLocation } from "react-router-dom";

const RequestForQuoteForm = (props) => {
	const { state } = useLocation();	
	const data = state;

	const [errors, setErrors] = useState([]);

  const handymanId = data.id;
	const handymanName = { name: `${data.first_name} ${data.last_name}` };
	const [buyerName, setBuyerName] = useState("");
	const [buyerEmail, setBuyerEmail] = useState("");
	const [buyerPhoneNumber, setBuyerPhoneNumber] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobStartDate, setJobStartDate] = useState("");
	const [estimatedManHours, setEstimatedManHours] = useState("");
	const [buyerWillingToPay, setBuyerWillingToPay] = useState("");

	// EVENT HANDLERS
	const sendFormData = (event) => {
		event.preventDefault();
		const form = event.target;
		const errors = validateForm(form);
		if (errors.length > 0) {
			return setErrors(errors);
		}
		setErrors([]);
    const formData = {
      handymanId,
			handymanName,
			buyerName,
			buyerEmail,
			buyerPhoneNumber,
			jobDescription,
			jobStartDate,
			estimatedManHours,
			buyerWillingToPay,
		};
		const requestData = [
			"service_l0m5rpd",
			"template_elv94vx",
			formData,
			"user_Z6650OqueHooRxmmi5Geo",
		];
		sendQuoteRequest(requestData);
		form.reset();
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
      <div className="handyman-summary">
        <h2>Handyman Info</h2>
        <p>
          <span>Name:</span> <span className="bold">{data.first_name}</span>{" "}
          <span className="bold">{data.last_name}</span>
        </p>
        <div className="handyman-skills">
          <p>Skills:</p>
          <Skills skills={data.skills} />
        </div>
        <p>
          <span>Area:</span>{" "}
          <span className="bold">{`${data.area}, ${data.address.city}`}</span>
        </p>
      </div>
      <div>
        <fieldset className="input-field-group contact-details">
          <legend className="subtitle">Contact Details</legend>
          <div className="input-field">
            <label htmlFor="first-name">Your Name</label>
            <span className="required">*</span>&nbsp;
            <input
              type="text"
              id="buyer-name"
              name="buyer-name"
              maxLength={60}
              required
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="Enter your name here"
              value={buyerName}
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
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="someone@example.com"
              value={buyerEmail}
            />
          </div>
          <div className="input-field">
            <label htmlFor="phone-number">Phone Number (optional)</label>{" "}
            <input
              type="tel"
              id="phone-number"
              name="phone-number"
              maxLength={13}
              onChange={(e) => setBuyerPhoneNumber(e.target.value)}
              value={buyerPhoneNumber}
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
              name="job-description"
              maxLength={500}
              required
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Short summary of the job"
              value={jobDescription}
            ></textarea>
          </div>
          <div className="input-field">
            <label htmlFor="date-start">Expected Start Date</label>
            <span className="required">*</span>&nbsp;
            <input
              type="date"
              id="date-start"
              name="date-start"
              required
              min={new Date().toLocaleDateString()}
              onChange={(e) => setJobStartDate(e.target.value)}
              value={jobStartDate}
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
              <input
                type="number"
                id="man-hours"
                name="man-hours"
                onChange={(e) => setEstimatedManHours(e.target.value)}
                value={estimatedManHours}
              />
            </div>
            <div className="input-field">
              <label htmlFor="price">Willing to Pay £</label>{" "}
              <input
                type="number"
                id="price"
                name="price"
                onChange={(e) => setBuyerWillingToPay(e.target.value)}
                value={buyerWillingToPay}
              />
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
