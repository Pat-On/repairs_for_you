import { useLocation, useParams,Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authContext";
import classes from "./AdminPage.module.css";

export default function UpdateForm() {
	const [isRedirect,setIsRedirect]=useState(false);
  const authCtx = useContext(AuthContext);
  const { id } = useParams();

  // INPUT FIELDS STATES DECLARATION AND INITIALIZING TO EMPTY STRING 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [bio, setBio] = useState("");

  // FETCH HANDYMAN DATA BY ID 

  useEffect(() => {
    fetch(`/api/v1/handyman/handymanprotected/${id}`, {
      headers: { Authorization: `Bearer ${authCtx.token}` },
    })
      .then((res) => res.json())
      .then((data) => {

// INPUT FIELDS UPDATE WITH INCOMING DATA 

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone_number);
        setEmail(data.email);
        setCity(data.address.city);
        setPostcode(data.postcode);
        setSkills(data.skills);
        setAddressLineOne(data.address.addressLineOne);
        setAddressLineTwo(data.address.addressLineTwo);
        setBio(data.bio);
      });
  }, [id]);

  // SUBMIT FORM DATA FUNCTION 

  const submitData = async (e) => {
    e.preventDefault();
    fetch(`/api/v1/handyman/handymanprotected/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        address: {
          addressLineOne,
          addressLineTwo,
          city, 
        },
        phoneNumber,
        postcode,
      skills:[...skills, newSkill],
        bio,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error)); 
    alert(`Repairer's detail has been updated`)
    setIsRedirect(true);
      
  };

  return (
   !isRedirect ? <div>
      <form
      className={classes.updateForm}
        name="form-edit-repairer"
        onSubmit={submitData}
      >
        <fieldset className={classes.input_field_group_details}>
          <legend className={classes.subtitle}>Edit repairer details</legend>
          <div className={classes.basic_details}>
            <h3>Basic Details</h3>
            <div className={classes.input_field}>
              <label htmlFor="first-name">
                First Name<span className="required">*</span>
              </label>{" "}
              <input
                type="text"
                id="firstName"
                name="firstName"
                maxLength={50}
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} // INPUT FIELD VALUES WILL BE RESET TO TYPED VALUE 
              />
            </div>
            <div className={classes.input_field}>
              <label htmlFor="last-name">
                Last Name<span className="required">*</span>
              </label>{" "}
              <input
                type="text"
                id="lastName"
                name="lastName"
                maxLength={50}
                required
                value={lastName}
                onChange={(e) => {
                  console.log(e.target.value);
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div  className={classes.input_field_group_details}>
            <h3>Address</h3>
            <div className={classes.input_field}>
              <label htmlFor="address-line-one">
                Address Line 1<span className="required">*</span>
              </label>{" "}
              <input
                type="text"
                id="addressLineOne"
                name="addressLineOne"
                maxLength={50}
                required
                value={addressLineOne}
                onChange={(e) => setAddressLineOne(e.target.value)}
              />
            </div>
            <div className={classes.input_field}>
              <label htmlFor="address-line-two">
                Address Line 2<span className="required">*</span>
              </label>{" "}
              <input
                type="text"
                id="addressLineTwo"
                name="addressLineTwo"
                maxLength={50}
                required
                value={addressLineTwo}
                onChange={(e) => setAddressLineTwo(e.target.value)}
              />
            </div>

            <div className={classes.input_field}>
              <label htmlFor="city">
                City or District<span className="required">*</span>
              </label>{" "}
              <input
                type="text"
                id="city"
                name="city"
                maxLength={50}
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={classes.input_field}>
              <label htmlFor="Postcode">
                Postcode<span className="required">*</span>
              </label>{" "}
              <input
                type="text"
                id="postcode"
                name="postcode"
                maxLength={12}
                required
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.contact_details}>
            <h3>Contact Details</h3>
            <div className={classes.input_field}>
              <label htmlFor="email">
                Email<span className="required">*</span>
              </label>{" "}
              <input
                type="email"
                id="email"
                name="email"
                maxLength={50}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.input_field}>
              <label htmlFor="phone-number">
                Phone Number<span className="required">*</span>
              </label>{" "}
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
               // minLength={11}
                //maxLength={13}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className={classes.input_field_skills}>
          <legend className="subtitle">
            Skills<span className="required">*</span>
          </legend>
          {skills.map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
  {/* INPUT FIELD FOR THE ADMIN TO ADD NEW SKILL TO THE HANDYMAN SKILLS */}
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="add new skill"
          ></input>
        </fieldset>
        <div className={classes.edit_button}>
          <input type="submit" id="btn-submit" name="btn-submit" value="Update" />
        </div>
      </form>
    </div>
    :  <Redirect to="/admin-panel/handyPeople" />
  );
}
