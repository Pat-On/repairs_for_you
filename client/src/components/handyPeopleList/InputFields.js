import { func } from "prop-types";
import React, { useState } from "react";


export default function InputFields({ search,setSearch,handleChange }) {

	return(
		<form className="form" >
			<div className="form-group">
				<div>
					<label >filter by skill</label>
					<input type="text" className="by-skill"  placeholder="Type a skill"  onChange={handleChange} />
				</div>
				<div>
					<label >filter by keyword</label>
					<input type="text" className="by-keyword"  placeholder="type a keyword"  onChange={handleChange} />
				</div>



			</div>
		</form>
	);


}
