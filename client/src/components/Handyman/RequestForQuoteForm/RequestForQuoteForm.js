import { useState } from "react";
import "./RequestForQuoteForm.css";
import Skills from "../SubComponents/Skills";

const RequestForQuoteForm = () => {
  const [errors, setErrors] = useState([]);
  // EVENT HANDLERS
  const sendFormData = (event) => {
    event.preventDefault();
    const errors = validateForm(event.target);
    if (errors.length > 0) {
      return setErrors(errors);
    }
    setErrors([]);
    alert("Thank you, your request has been sent. We will get back to you as soon as possible");
    window.location.reload();
  };

  return (
    <form id="form-add-quote" onSubmit={sendFormData}>
      {errors.map((e, index) => (
        <p key={index} className="error">
          {e}
        </p>
      ))}
      <h1>Request For Quote</h1>
      <div>
        <div className="input-field">
          <label htmlFor="first-name">Your Name</label>
          <input
            type="text"
            id="buyer-name"
            name="form-add-quote"
            max={60}
            required
            placeholder="Enter your name here"
          />
        </div>
        <div className="input-field-group">
          <h2 className="subtile">Contact Details</h2>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="form-add-quote"
              max={50}
              required
              placeholder="someone@example.com"
            />
          </div>
          <div className="input-field">
            <label htmlFor="phone-number">Phone Number (optional)</label>
            <input
              type="tel"
              id="phone-number"
              name="form-add-quote"
              max={50}
            />
          </div>
        </div>
      </div>
      <Skills formId="form-add-quote" />
      <div className="input-field-group">
        <h2 htmlFor="subtitle">Job Details</h2>
        <div className="input-field">
          <textarea
            id="job-description"
            name="form-add-quote"
            max={1000}
            required
            placeholder="Short summary of the job"
          ></textarea>
        </div>
        <div className="input-field">
          <label htmlFor="date-start">Expected for Date:</label>{" "}
          <input
            type="date"
            id="date-start"
            name="form-add-quote"
            max={new Date().toLocaleDateString()}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="job-duration-days">Estimated Number of Hours:</label>{" "}
          <input
            type="number"
            id="job-duration-days"
            name="form-add-quote"
          />
        </div>
        <div className="input-field">
          <label htmlFor="price">I am willing to pay £</label>{" "}
          <input
            type="number"
            id="price"
            name="form-add-quote"
          />
        </div>
      </div>
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
