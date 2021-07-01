import { useLocation } from "react-router-dom";


// TODO: IT does not work
export default function UpdateForm() {
  const { state } = useLocation();
  const userData = state;
  const handleChange = (e) => {

    console.log(e.target.value);
  };

  return (
    <div>
      <form
        id="form-add-handyman"
        name="form-add-handyman"
        // onSubmit={handleChange(e)} 
      >
        <fieldset className="input-field-group details">
          <legend className="subtitle">Update User details</legend>
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
                defaultValue={userData.first_name}
                onChange={handleChange}
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
                defaultValue={userData.last_name}
                onChange={handleChange}
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
                defaultValue={userData.address_offer}
                onChange={handleChange}
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
                defaultValue={userData.address_offer}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                defaultValue={userData.postcode}
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
                defaultValue={userData.email}
                onChange={handleChange}
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
                defaultValue={userData.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="input-field-group skills">
          <legend className="subtitle">
            Skills<span className="required">*</span>
          </legend>
          <em className="required">Please select at least one skill</em>
          {console.log(userData.skills)}
          {/* <Skills
						skills={userData.skills}
					/> */}
        </fieldset>
        <div className="submit-button-div">
          <input
            type="submit"
            id="btn-submit"
            name="btn-submit"
            value="update"
          />
        </div>
      </form>
    </div>
  );
}

// const Skills = ({ skills }) => {
//   return (
//     <div>
//       {skills.map((skill, index) => (
//         <div key={index} className="input-field">
//           <span>{skill}</span>
//         </div>
//       ))}
//     </div>
//   );
// };
