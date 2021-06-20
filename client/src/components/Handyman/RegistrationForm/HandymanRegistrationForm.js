import { useState } from "react";
import "./HandymanRegistrationForm.css";
import Skills from "../SubComponents/Skills";
import { send } from "emailjs-com";

const HandymanRegistrationForm = (props) => {
  const [errors, setErrors] = useState([]);
  const [toSend, setToSend] = useState({
    first_name: "",
    last_name: "",
    address_line_one: "",
    address_line_two: "",
    city: "",
    postcode: "",
    country: "",
    email: "",
    phone_number: "",
    bio: "",
  });

  const allSkills = [
    { id: 1, name: "Brick laying" },
    { id: 2, name: "Carpentry" },
    { id: 3, name: "Electrical Work" },
    {
      id: 4,
      name: "Appliance installation and repair",
    },
    {
      id: 5,
      name: "Interior and exterior property maintenance",
    },
    { id: 6, name: "Tiling" },
    { id: 7, name: "Plastering" },
    { id: 8, name: "Plumbing" },
    { id: 9, name: "Painting" },
    { id: 10, name: "Decorating" },
  ];

  // EVENT HANDLERS

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
    console.log(toSend.email);
  };

  const sendFormData = (e) => {
    e.preventDefault();
    send(
      "service_l0m5rpd",
      "template_ybb8yxc",
      toSend,
      "user_Z6650OqueHooRxmmi5Geo"
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  return (
    <form
      id="form-add-handyman"
      className="registration-form"
      onSubmit={sendFormData}
    >
      {errors.map((e, index) => (
        <p key={index} className="error">
          {e}
        </p>
      ))}
      <h1>Register With Us Today</h1>
      <div>
        <div className="input-field">
          <label htmlFor="first-name">First Name: </label>
          <input
            type="text"
            id="first-name"
            name="form-add-handyman"
            required
            placeholder="Enter your first name here"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="last-name">Last Name: </label>
          <input
            type="text"
            id="last-name"
            name="form-add-handyman"
            max={50}
            required
            placeholder="Enter your last name here"
            onChange={handleChange}
          />
        </div>
        <div className="input-field-group">
          <h2 className="subtile">Contact Details: </h2>
          <div className="input-field">
            <label htmlFor="address-line-one">Address Line 1: </label>
            <input
              type="number"
              id="address-line-one"
              name="form-add-handyman"
              required
              placeholder="Enter your building or flat number"
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="address-line-two">Address Line 2: </label>
            <input
              type="text"
              id="address-line-two"
              name="form-add-handyman"
              max={50}
              required
              placeholder="Enter your street name here"
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="city">City: </label>
            <input
              type="text"
              id="city"
              name="form-add-handyman"
              defaultValue="Coventry"
              placeholder="Enter your city, district or county name here"
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="Postcode">Postcode: </label>
            <input
              type="text"
              id="Postcode"
              name="form-add-handyman"
              max={50}
              required
              placeholder="Enter your postcode here"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="country">Country: </label>
          <input
            type="text"
            id="country"
            name="form-add-handyman"
            max={50}
            required
            placeholder="Enter your country name here"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="form-add-handyman"
            max={50}
            required
            placeholder="someone@example.com"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="phone-number">Phone Number: </label>
          <input
            type="tel"
            id="phone-number"
            name="form-add-handyman"
            max={50}
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <fieldset className="input-field-group skills-group">
        <legend className="subtitle">Skills</legend>
        <Skills skills={allSkills} formId="form-add-handyman" />
      </fieldset>
      <div className="input-field-bio">
        <h2 className="subtitle">Bio: </h2>
        <textarea
          type="text-area"
          id="bio"
          name="bio"
          max={500}
          required
          placeholder="Short introduction about you or what you do..."
          onChange={handleChange}
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
