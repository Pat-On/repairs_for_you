import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./MainPage.module.scss";
import PrimarySection from "./primarySection/PrimarySection";
import AboutSection from "./aboutSection/AboutSection";
import CustomersSection from "./customersSection/CustomerSection";
import Explanation from "./explanaTion/Explanation";

// !TODO: decomposition of this elements in next stage

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
