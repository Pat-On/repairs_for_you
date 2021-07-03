import { useLocation, useParams } from "react-router-dom";
import {useContext,useEffect,useState} from "react"
import AuthContext from "../../store/authContext";
import classes from './AdminPage.module.css'




// TODO: IT does not work
export default function UpdateForm() {
  const authCtx = useContext(AuthContext);
  //const { state } = useLocation();
  const {id}=useParams()
  //const [data,setdata]=useState([]);
  //const data = state; 
/* const [formData,setFormData]=useState({}) */
  // handle change function work in progress






  const handleChange = (e) => {
   /*  e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData); */
    
  };

  useEffect(() => {
    fetch(`/api/v1/handyman/handymanprotected/${id}`,
    { headers: { "Authorization": `Bearer ${authCtx.token}` }})
    .then(res=>res.json())
    .then(data=>
{console.log(data)
   
    })
   }, [id])
  
  return /* data.length===0 ? <p>Please wait .......</p> : */ (
    <div>
      <form
        id="form-add-handyman" 
        name="form-add-handyman"
         onSubmit={submitData}
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
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
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
                onChange={(e)=>{
                  console.log(e.target.value)
                  setLastName(e.target.value)}}

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
                value={addressLineOne} 
                onChange={(e)=>setAddressLineOne(e.target.value)}
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
                onChange={(e)=>setAddressLineTwo(e.target.value)}

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
                onChange={(e)=>setCity(e.target.value)}

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
                onChange={(e)=>setPostcode(e.target.value)}
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
                onChange={(e)=>setEmail(e.target.value)}

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
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}

              />
            </div>
          </div>
        </fieldset>
        <fieldset className={classes.input_field}>
          <legend className="subtitle">
            Skills<span className="required">*</span>
          </legend>
         {/*  {data.skills.map((skill,index)=><p key={index}>{skill}</p>)} */}
          <input placeholder="added new skill"></input>      
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
