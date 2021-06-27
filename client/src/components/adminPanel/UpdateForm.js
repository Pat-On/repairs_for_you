import React, { useEffect, useState } from "react";
import Skills from "../Handyman/SubComponents/Skills";
import { useRouteMatch, useParams } from "react-router";

export default function UpdateForm(props) {
	let [userData,setUserData]=useState([]);
	const { id } = useParams();



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




	return (
		<div>
			<form
				id="form-add-handyman"
				name="form-add-handyman"
			/* 	onSubmit={updateForm} */
			>
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
								defaultValue={userData.first_name}
								placeholder="Enter your first name here"
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
								defaultValue={userData.address_offer}

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
								defaultValue={userData.address_offer}
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
								defaultValue={userData.postCode}
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
								defaultValue={userData.email}
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
								defaultValue={userData.phone_number}


							/>
						</div>
					</div>
				</fieldset>
				<fieldset className="input-field-group skills">
					<legend className="subtitle">
          Skills<span className="required">*</span>
					</legend>
					<em className="required">Please select at least one skill</em>
					{/* <Skills
						skills={allSkills}
					/> */}
				</fieldset>
				<div className="submit-button-div">
					<input type="submit" id="btn-submit" name="btn-submit" value="update" />
				</div>
			</form>
		</div>
	);
}
