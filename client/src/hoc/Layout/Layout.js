import React, { useState } from "react";

import Aux from "../Auxillary/Auxillary";
import Toolbar from "../../components/navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/navigation/Sidedrwer/Sidedrawer";
// import Footer from "../../components/Footer/Footer";

import classes from "./Layout.module.scss";

const Layout = (props) => {
	//!TODO SIDE DRAWER
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
			{/* <Footer /> */}
		</Aux>
	);
};

export default Layout;
