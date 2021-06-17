import { useState } from "react";
import "./HandymanRegistrationForm.css";
import Skills from "./Skills";

const HandymanRegistrationForm = (props) => {
  const [errors, setErrors] = useState([]);
  // EVENT HANDLERS
  const sendFormData = (event) => {
    event.preventDefault();
    const errors = validateForm(event.target);
    if (errors.length > 0) {
      return setErrors(errors);
    }
    setErrors([]);
    const formData = getFormData(event.target.id)
    props.onAddHandyman(formData);
  };

  return (
    <form id="form-add-handyman" onSubmit={sendFormData}>
      {errors.map((e, index) => (
        <p key={index} className="error">
          {e}
        </p>
      ))}
      <h1>Registration Form</h1>
      <div>
        <div className="input-field">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="form-add-handyman"
            max={50}
            required
            placeholder="Enter your first name here"
          />
        </div>
        <div className="input-field">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="form-add-handyman"
            max={50}
            required
            placeholder="Enter your last name here"
          />
        </div>
        <div className="input-field-group">
          <h2 className="subtile">Contact Details</h2>
          <div className="input-field">
            <label htmlFor="address-line-one">Address Line 1</label>
            <input
              type="number"
              id="address-line-one"
              name="form-add-handyman"
              max={50}
              required
              placeholder="Enter your building or flat number"
            />
          </div>
          <div className="input-field">
            <label htmlFor="address-line-two">Address Line 2</label>
            <input
              type="text"
              id="address-line-two"
              name="form-add-handyman"
              max={50}
              required
              placeholder="Enter your street name here"
            />
          </div>
          <div className="input-field">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="form-add-handyman"
              max={50}
              required
              placeholder="Enter your city, district or county name here"
            />
          </div>
          <div className="input-field">
            <label htmlFor="Postcode">Postcode</label>
            <input
              type="text"
              id="Postcode"
              name="form-add-handyman"
              max={50}
              required
              placeholder="Enter your postcode here"
            />
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="form-add-handyman"
            max={50}
            required
            placeholder="Enter your country name here"
          />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="form-add-handyman"
            max={50}
            required
            placeholder="someone@example.com"
          />
        </div>
        <div className="input-field">
          <label htmlFor="phone-number">Phone Number</label>
          <input
            type="tel"
            id="phone-number"
            name="form-add-handyman"
            max={50}
            required
          />
        </div>
      </div>
      <Skills formId="form-add-handyman"/>
      <div className="input-field">
        <h2 className="subtitle">Bio</h2>
        <input
          type="text-area"
          id="bio"
          name="form-add-handyman"
          max={500}
          required
          placeholder="Short introduction about you or what you do..."
        />
      </div>
      <div className="submit-button-div">
        <input
          type="submit"
          id="btn-submit"
          name="form-add-handyman"
          max={50}
          value="Submit"
        />
        </div>
    </form>
  );
};

export default HandymanRegistrationForm;
