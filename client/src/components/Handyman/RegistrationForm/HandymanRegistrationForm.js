import { useState } from "react";
import "./HandymanRegistrationForm.css";
import Skills from "../SubComponents/Skills";

import {
  sendRegistrationRequest,
  validateForm,
} from "../../../common/js/functions";

const HandymanRegistrationForm = (props) => {
  const [errors, setErrors] = useState([]);

  const allSkills = [
    { id: 1, name: "brickLaying", value: "Brick laying" },
    { id: 2, name: "arpentry", value: "Carpentry" },
    { id: 3, name: "electricalWork", value: "Electrical Work" },
    {
      id: 4,
      name: "intallAndRepair",
      value: "Appliance installation and repair",
    },
    {
      id: 5,
      name: "propertyMaintenance",
      value: "Interior and exterior property maintenance",
    },
    { id: 6, name: "tiling", value: "Tiling" },
    { id: 7, name: "plastering", value: "Plastering" },
    { id: 8, name: "plumbing", value: "Plumbing" },
    { id: 9, name: "painting", value: "Painting" },
    { id: 10, name: "pecorating", value: "Decorating" },
  ];

  // EVENT HANDLERS
  const sendFormData = (event) => {
    event.preventDefault();
    const form = event.target;
    const errors = validateForm(form);
    if (errors.length > 0) {
      return setErrors(errors);
    }
    
    setErrors([]);
    const requestData = [
      "service_l0m5rpd",
      "template_ybb8yxc",
      form,
      "user_Z6650OqueHooRxmmi5Geo",
    ];
    sendRegistrationRequest(requestData);
    form.reset();
  };

  return (
    <form
      id="form-add-handyman"
      name="form-add-handyman"
      onSubmit={sendFormData}
    >
      {errors.map((e, index) => (
        <p key={index} className="error">
          {e}
        </p>
      ))}
      <h1 className="title">Become a Handyman</h1>
      <fieldset className="input-field-group details">
        <legend className="subtitle">Your Details</legend>
        <div className="basic-details">
          <h3>Basic Details</h3>
          <div className="input-field">
            <label htmlFor="first-name">
              First Name<span className="required">*</span>
            </label>{" "}
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="Enter your first name here"
            />
          </div>
          <div className="input-field">
            <label htmlFor="last-name">
              Last Name<span className="required">*</span>
            </label>{" "}
            <input
              type="text"
              id="lastName"
              name="lastName"
              maxLength={50}
              required
              placeholder="Enter your last name here"
            />
          </div>
        </div>
        <div className="input-field-group address-details">
          <h3>Address</h3>
          <div className="input-field">
            <label htmlFor="address-line-one">
              Address Line 1<span className="required">*</span>
            </label>{" "}
            <input
              type="text"
              id="addressLineOne"
              name="addressLineOne"
              maxLength={50}
              required
              placeholder="Enter your building or flat number"
            />
          </div>
          <div className="input-field">
            <label htmlFor="address-line-two">
              Address Line 2<span className="required">*</span>
            </label>{" "}
            <input
              type="text"
              id="addressLineTwo"
              name="addressLineTwo"
              maxLength={50}
              required
              placeholder="Enter your street name here"
            />
          </div>
          <div className="input-field">
            <label htmlFor="city">
              City or District<span className="required">*</span>
            </label>{" "}
            <input
              type="text"
              id="city"
              name="city"
              defaultValue="Coventry"
              placeholder="City, county or district name"
            />
          </div>
          <div className="input-field">
            <label htmlFor="Postcode">
              Postcode<span className="required">*</span>
            </label>{" "}
            <input
              type="text"
              id="postcode"
              name="postcode"
              maxLength={50}
              required
              placeholder="Enter your postcode here"
            />
          </div>
        </div>
        <div className="input-field-group contact-details">
          <h3>Contact Details</h3>
          <div className="input-field">
            <label htmlFor="email">
              Email<span className="required">*</span>
            </label>{" "}
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
            <label htmlFor="phone-number">
              Phone Number<span className="required">*</span>
            </label>{" "}
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              maxLength={50}
              required
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="input-field-group skills">
        <legend className="subtitle">
          Skills<span className="required">*</span>
        </legend>
        <em className="required">Please select at least one skill</em>
        <Skills skills={allSkills} />
      </fieldset>
      <div className="input-field-bio">
        <h2 className="subtitle">
          Bio<span className="required">*</span>
        </h2>
        <textarea
          type="text-area"
          id="bio"
          name="bio"
          maxLength={500}
          required
          placeholder="Short introduction about you or what you do..."
        />
      </div>
      <div className="submit-button-div">
        <input type="submit" id="btn-submit" name="btn-submit" value="Submit" />
      </div>
    </form>
  );
};

export default HandymanRegistrationForm;
