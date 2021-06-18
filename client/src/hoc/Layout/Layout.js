import React, { useState } from "react";

import Aux from "./../Auxillary/Auxillary.js";
import Toolbar from "./../../components/Navigation/Toolbar/Toolbar.js";
import SideDrawer from "./../../components/Navigation/Sidedrwer/Sidedrawer.js";
import Footer from "./../../components/Footer/Footer.js";

import classes from "./Layout.module.scss";

/**
 * @DescriptionFunction Main Layout of application, where <main> is used as a widget to display other parts of application required by specification. 
 */
const Layout = (props) => {
	const [sideDrawerIsVisible, setSideDrawerVisible] = useState(false);

	const sideDrawerClosedHandler = () => {
		setSideDrawerVisible(false);
	};
	const sideDrawerToggleHandler = () => {
		setSideDrawerVisible(!sideDrawerIsVisible);
	};

	return (
		<Aux>
			<Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
			<SideDrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} />

			<main className={classes.content}>{props.children}</main>
			<Footer />
		</Aux>
	);
};

export default Layout;
