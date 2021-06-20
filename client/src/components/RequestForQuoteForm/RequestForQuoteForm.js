import { useState } from "react";
import "./RequestForQuoteForm.css";
import Skills from "../Handyman/SubComponents/Skills";
import { validateForm, sendQuoteRequest } from "../Handyman/functions";

const RequestForQuoteForm = (props) => {
  const data = props.data.location.state;
  const [errors, setErrors] = useState([]);
  
  // EVENT HANDLERS
  const sendFormData = (event) => {
    event.preventDefault();
    const form = event.target;
    const errors = validateForm(form);
    if (errors.length > 0) {
      return setErrors(errors);
    }
    const formData = [...new FormData(form).entries()];
    setErrors([]);
    sendQuoteRequest(formData);
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
              id="buyer-name"
              name="buyer-name"
              maxLength={60}
              required
              placeholder="Enter your name here"
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
            />
          </div>
          <div className="input-field">
            <label htmlFor="phone-number">Phone Number (optional)</label>{" "}
            <input
              type="tel"
              id="phone-number"
              name="phone-number"
              maxLength={13}
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
              maxLength={1000}
              required
              placeholder="Short summary of the job"
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
              name="date-start"
              required
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
              <input type="number" id="man-hours" name="man-hours" />
            </div>
            <div className="input-field">
              <label htmlFor="price">Willing to Pay £</label>{" "}
              <input type="number" id="price" name="price" />
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
