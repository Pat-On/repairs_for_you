import { useState } from "react";
import "./RequestForQuoteForm.css";
import Skills from "../SubComponents/Skills";
import { validateForm } from "../functions";

const RequestForQuoteForm = (props) => {
  const data = props.data.location.state;
  console.log(data.skills);
  const [errors, setErrors] = useState([]);
  // EVENT HANDLERS
  const sendFormData = (event) => {
    event.preventDefault();
    const errors = validateForm(event.target);
    if (errors.length > 0) {
      return setErrors(errors);
    }
    setErrors([]);
    alert(
      "Thank you, your request has been sent. We will get back to you as soon as possible"
    );
  };

  return (
    <form id="form-add-quote" className="form" onSubmit={sendFormData}>
      {errors.map((e, index) => (
        <p key={index} className="error">
          {e}
        </p>
      ))}
      <h1>Request For Quote</h1>
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
              name="form-add-quote"
              max={60}
              // required
              placeholder="Enter your name here"
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Your Email</label>
            <span className="required">*</span>&nbsp;
            <input
              type="email"
              id="email"
              name="form-add-quote"
              max={50}
              // required
              placeholder="someone@example.com"
            />
          </div>
          <div className="input-field">
            <label htmlFor="phone-number">Phone Number (optional)</label>{" "}
            <input
              type="tel"
              id="phone-number"
              name="form-add-quote"
              max={50}
            />
          </div>
        </fieldset>
      </div>
      <fieldset className="input-field-group job-details">
        <legend className="subtitle">Job Details</legend>
        <div className="input-field-group">
          <div className="input-field">
            <h3>
              Job Description
              <span className="required">*</span>&nbsp;
            </h3>
            <textarea
              id="job-description"
              name="form-add-quote"
              max={1000}
              // required
              placeholder="Short summary of the job"
            ></textarea>
          </div>
          <div className="handyman-skills">
            <h3>Required Skill(s) (optional)</h3>
            <Skills skills={data.skills} formId="form-add-quote" />
          </div>
          <div className="input-field">
            <label htmlFor="date-start">Expected Start Date</label>
            <span className="required">*</span>&nbsp;
            <input
              type="date"
              id="date-start"
              name="form-add-quote"
              max={new Date().toLocaleDateString()}
              // required
            />
          </div>
          <div>
            <em className="required">
              Please provide estimate for at least one of the following:
            </em>
            <div className="input-field">
              <label htmlFor="job-duration-days">
                Estimated Number of Hours:
              </label>{" "}
              <input
                type="number"
                id="job-duration-days"
                name="form-add-quote"
              />
            </div>
            <div className="input-field">
              <label htmlFor="price">I am willing to pay £</label>{" "}
              <input type="number" id="price" name="form-add-quote" />
            </div>
          </div>
        </div>
      </fieldset>
      <div className="submit-button-div">
        <input
          type="submit"
          id="btn-submit"
          name="form-add-quote"
          value="Submit"
        />
      </div>
    </form>
  );
};

export default RequestForQuoteForm;
