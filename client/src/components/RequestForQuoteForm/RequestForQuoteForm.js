import { useState } from "react";
import "./RequestForQuoteForm.css";
import Skills from "./Skills";
import { validateForm, sendQuoteRequest } from "../../common/js/functions";
import { useLocation } from "react-router-dom";

const RequestForQuoteForm = () => {
  const { state } = useLocation();
  const data = state;

  const [errors, setErrors] = useState([]);

  const handymanId = data ? data.id : 0;
  const handymanName = data
    ? { name: `${data.first_name} ${data.last_name}` }
    : "(not provided)";
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhoneNumber, setBuyerPhoneNumber] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");

  // organise fields that need further validation
  const fieldsToValidate = [
    { type: "email", value: buyerEmail },
    { type: "tel", value: buyerPhoneNumber },
  ];

  // organise the form data to be sent
  const formData = {
    handymanId,
    handymanName,
    buyerName,
    buyerEmail,
    buyerPhoneNumber,
    jobDescription,
    jobStartDate,
  };

  // EVENT HANDLERS
  const sendFormData = async (event) => {
    event.preventDefault();
    const form = event.target;
    const errors = validateForm(fieldsToValidate);
    if (errors.length > 0) {
      return setErrors(errors);
    }

    setErrors([]);
    const requestData = [
      "service_l0m5rpd",
      "template_elv94vx",
      formData,
      "user_Z6650OqueHooRxmmi5Geo",
    ];
    // check if sending quote request was successful. Navigate to homepage if it was.
    const okToGoHome = await sendQuoteRequest(requestData);
    if (okToGoHome) window.location.assign("/");
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
      {data && (
        <div className="handyman-summary">
          <h2>Repairer Info</h2>
          <p>
            <span>Name:</span> <span className="bold">{data.first_name}</span>{" "}
            <span className="bold">{data.last_name}</span>
          </p>
          <div className="handyman-skills">
            <p>Skills:</p>
            <Skills skills={data.skills} />
          </div>

          {/* WARN: COMMENTED OUT SECTION BELOW IS INCLUDED ONLY IN LIGHT OF PROBABLE FUTURE NEEDS */}

          {/* <p>
            <span>Area:</span>{" "}
            <span className="bold">{`${data.area}, ${data.address.city}`}</span>
          </p> */}
        </div>
      )}

      <div>
        <em className="required">
          <span className="required">*</span>&nbsp;Required field
        </em>
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
        </div>
      </fieldset>
      <div className="submit-button-div">
        <input type="submit" id="btn-submit" name="btn-submit" value="Submit" />
      </div>
    </form>
  );
};

export default RequestForQuoteForm;
