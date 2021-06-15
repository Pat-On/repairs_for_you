import React from "react";

export default function InputFields() {
	return (
		<form className="form">
			<div className="form-group">
				<div>
					<label >What</label>
					<input type="text" className="form-control"  placeholder="sector" />
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
