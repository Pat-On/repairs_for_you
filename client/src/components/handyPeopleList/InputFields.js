import { func } from "prop-types";
import React, { useState } from "react";


export default function InputFields({search,setSearch,hand}) {

	const handleChange=(e)=>{

		console.log(e.target.value);
	};
	return (
		<form className="form" >
			<div className="form-group">
				<div>
					<label >What</label>
					<input type="text" className="form-control"  placeholder="sector"  onChange={handleChange} />
				</div>
				<div className="">
					<label >Where</label>
					<input type="text" className="form-control"  placeholder="location" />
				</div>
				<div>
					<button type="submit" className="btn btn-primary">Search</button>
				</div>

			</div>
		</form>
	);
}
