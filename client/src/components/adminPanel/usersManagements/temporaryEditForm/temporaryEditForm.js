import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";

const TemporaryEditForm = (props) => {
	let { path, url } = useRouteMatch();
	console.log(props.history)



    return (
        <div><p>I am placeholder</p></div>
    )
}


export default TemporaryEditForm;