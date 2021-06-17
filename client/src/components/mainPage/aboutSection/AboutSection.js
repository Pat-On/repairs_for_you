import React, { useEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, Switch, Link } from "react-router-dom";

import classes from "./AboutSection.module.scss";

import cyfLogo from "./../../../public/cyf_brand.png"

// !TODO: decomposition of this elements in next stage

const AboutSection = (props) => {
  return (
    <div className={classes.about}>
      <h2>About US</h2>
      <p>
        After the success of last year's project to help refugees and migrants
        find work as cleaners, CYF is partnering with the Coventry Refugee and
        Migrant Centre again to build another site aimed at helping migrants
        find work. The website supports our  Handyperson service,
        allowing our beneficiaries (refugees and migrants communities) to
        realise their entrepreneurial potential by providing home repairs
        services for customers across the city of Coventry.
      </p>
    </div>
  );
};

export default AboutSection;
