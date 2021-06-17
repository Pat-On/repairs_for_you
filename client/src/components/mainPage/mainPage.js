import React from "react";

import classes from "./mainPage.module.scss";
import PrimarySection from "./primarySection/PrimarySection";
import AboutSection from "./aboutSection/AboutSection";
import CustomersSection from "./customersSection/CustomerSection";
import Explanation from "./explanation/explanation";


/**
 * @DescriptionFunction This is component which is use as a mainPage in react app on the route "/" - home route
 * It is using four other components as a sub components PrimarySection AboutSection CustomersSection Explanation
 */
const MainPage = (props) => {
	return (
		<div className={classes.mainPage}>
			<PrimarySection />
			<AboutSection />
			<CustomersSection />
			<Explanation />
		</div>
	);
};

export default MainPage;
