import { useState } from "react";
import "./HandymanRegistrationForm.css";
import Skills from "./Skills";

import {
  sendRegistrationRequest,
  validateForm,
} from "../../../common/js/functions";

// default profile picture

const defaultHandymanProfilePicture =
  "https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg";

const HandymanRegistrationForm = (props) => {
  // form submission errors
  const [errors, setErrors] = useState([]);

  // handyman registration form entry values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [img, setProfilePicture] = useState(
    defaultHandymanProfilePicture // WARN: NO IMAGE UPLOAD FUNCTIONALITY ADDED!
  );
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [city, setCity] = useState("Coventry");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [bio, setBio] = useState("");

  const formData = {
    firstName,
    lastName,
    img,
    address: { addressLineOne, addressLineTwo, city },
    postcode,
    email,
    phoneNumber,
    skills: [...selectedSkills, otherSkill],
    bio,
  };
  // EVENT HANDLERS
  const sendFormData = async (event) => {
    event.preventDefault();
    const form = event.target;
    const errors = validateForm(form, form.id);
    if (errors.length > 0) {
      return setErrors(errors);
    }

    setErrors([]);
    const requestData = [
      "service_l0m5rpd",
      "template_ybb8yxc",
      formData,
      "user_Z6650OqueHooRxmmi5Geo",
    ];
    const okToResetForm = await sendRegistrationRequest(requestData);
    if (okToResetForm) form.reset();
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
              maxLength={50}
              required
              onChange={(event) => setFirstName(event.target.value)}
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
              onChange={(event) => setLastName(event.target.value)}
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
              onChange={(event) => setAddressLineOne(event.target.value)}
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
              onChange={(event) => setAddressLineTwo(event.target.value)}
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
              maxLength={50}
              required
              onChange={(event) => setCity(event.target.value)}
              defaultValue="Coventry"
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
              maxLength={12}
              required
              onChange={(event) => setPostcode(event.target.value)}
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
              onChange={(event) => setEmail(event.target.value)}
              placeholder="someone@example.com"
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">
              Confirm Your Email<span className="required">*</span>
            </label>{" "}
            <input
              type="email"
              id="email"
              name="email"
              maxLength={50}
              required
              onChange={(event) => setEmailConfirm(event.target.value)}
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
              minLength={11}
              maxLength={13}
              required
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="input-field-group skills">
        <legend className="subtitle">
          Skills<span className="required">*</span>
        </legend>
        <em className="required">Please select at least one skill</em>
        <Skills onChangeHandler={(list) => setSelectedSkills(list)} />
        <div className="input-field">
          <label htmlFor="other-skills">Other:</label>{" "}
          <input
            type="text"
            id="other-skills"
            name="other-skills"
            onChange={(event) => setOtherSkill(event.target.value)}
            placeholder={`What other handyman skill do you have?`}
          />
        </div>
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
          onChange={(event) => setBio(event.target.value)}
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
