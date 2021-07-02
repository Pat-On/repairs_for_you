import { useLocation, useParams } from "react-router-dom";
import {useContext,useEffect,useState} from "react"
import Skills from "../Handyman/SubComponents/Skills";
import AuthContext from "../../store/authContext";
import classes from './AdminPage.module.css'




// TODO: IT does not work
export default function UpdateForm() {
  const authCtx = useContext(AuthContext);
  const { state } = useLocation();
  const {id}=useParams()
  const [userData,setUserData]=useState([]);
  //const userData = state; 

  // handle change function work in progress

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    fetch(`/api/v1/handyman/handymanprotected/${id}`,
    { headers: { "Authorization": `Bearer ${authCtx.token}` }})
    .then(res=>res.json())
    .then(data=>setUserData(data))
   }, [id])
  
  return (
    <div>
      <form
        id="form-add-handyman"
        name="form-add-handyman"
        // onSubmit={handleChange(e)} 
      >
        <fieldset className={classes.input_field_group_details}>
          <legend className={classes.subtitle}>Edit User details</legend>
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
                defaultValue={userData.first_name}
                onChange={handleChange}
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
                defaultValue={userData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-field-group address-details">
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
                /* defaultValue={userData.address.addressLineOne} */
                onChange={handleChange}
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
               /*  defaultValue={userData.address.addressLineTwo} */
                onChange={handleChange}
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
                onChange={handleChange}
                defaultValue="Coventry"
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
                onChange={handleChange}
                defaultValue={userData.postcode}
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
                defaultValue={userData.email}
                onChange={handleChange}
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
                minLength={11}
                maxLength={13}
                required
                defaultValue={userData.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className={classes.input_field}>
          <legend className="subtitle">
            Skills<span className="required">*</span>
          </legend>
          <em className="required">Please select at least one skill</em>      
        </fieldset>
        <div className={classes.submit_button}>
          <input
            type="submit"
            id="btn-submit"
            name="btn-submit"
            value="Edit"
          />
        </div>
      </form>
    </div>
  );
}
