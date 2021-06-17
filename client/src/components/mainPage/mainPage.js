import React from "react";

import classes from "./MainPage.module.scss";
import PrimarySection from "./primarySection/PrimarySection";
import AboutSection from "./aboutSection/AboutSection";
import CustomersSection from "./customersSection/CustomerSection";
import Explanation from "./explanaTion/Explanation";

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
