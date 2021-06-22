export default function InputFields({ search,setSearch,handleChange }) {

	return(
		<form className="form" >
			<div className="form-group">
				<div>
					<input type="text" className="by-skill"  placeholder="filter by a skill"  onChange={handleChange} />
				</div>
				<div>
					<input type="text" className="by-keyword"  placeholder="filter by a keyword"  onChange={handleChange} />
				</div>



			</div>
		</form>
	);


}
