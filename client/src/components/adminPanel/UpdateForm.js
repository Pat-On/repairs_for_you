import React, { useEffect, useState } from "react";
import Skills from "../Handyman/SubComponents/Skills";
import { useRouteMatch, useParams } from "react-router";
import axios from "axios";


export default function UpdateForm(props) {
	let [userData,setUserData]=useState([]);
	const [updatedDetail,setUpdatedDetail]=useState({
		first_name:"",
		last_name:"",
		/* addressLineOne:"",
		addressLineTwo:"", */
		city:"",
		postcode:"",
		email:"",
		phone_number:"",


	});
	const { id } = useParams();


	const handleChange=(e)=>{
		setUpdatedDetail({
			...updatedDetail,
			[e.target.name]: e.target.value,
		  });
		  console.log(updatedDetail);
	};

	useEffect(() => {
		fetch(`/api/users/handyman/adminsacceshandymans/${id}`) .then((res) => {
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			return res.json();
		}) .then((body) => {
			setUserData(body.data);

		}).catch((err) => {
			console.error(err);
		});
	}, [id]);


	const updateForm=(e)=>{
		e.preventDefault();
		axios.request({
			method:"PATCH",
			url:`http://localhost:3100/api/users/handyman/adminsacceshandymans/${id}`,
			data:updatedDetail,
		}).then((response)=>props.history.push("/admin-panel/")).catch((error)=>console.log(error));


	};

	return (
		<div>
			<form
				id="form-add-handyman"
				name="form-add-handyman"
				onSubmit={updateForm}
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
								name="first_name"
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
								name="last_name"
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
							{/* <input
								type="text"
								id="addressLineOne"
								name="addressLineOne"
								maxLength={50}
								required
								defaultValue={userData.address_offer}
								onChange={handleChange}
							/> */}
						</div>
						<div className="input-field">
							<label htmlFor="address-line-two">
              Address Line 2<span className="required">*</span>
							</label>{" "}
							{/* <input
								type="text"
								id="addressLineTwo"
								 name="addressLineTwo"
								maxLength={50}
								required
								defaultValue={userData.address_offer}
								onChange={handleChange}
							/> */}
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
								name="phone_number"
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
					<em className="required"></em>
					{(userData.skills)}

				</fieldset>
				<div className="submit-button-div">
					<input type="submit" id="btn-submit" name="btn-submit" value="update" />
				</div>
			</form>
		</div>
	);
}
