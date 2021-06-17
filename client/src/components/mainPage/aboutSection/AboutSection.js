import React from "react";

import classes from "./AboutSection.module.scss";

import cyfLogo from "./../../../public/cyf_brand.png"
import coventryRefLogo from "./../../../public/coventryRefugeeCenter.jpg"


/**
 * @DescriptionFunction Sub component used in MainPage component
 */
const AboutSection = (props) => {
  return (
    <div className={classes.about}>
      <h2 className={classes.about__heading}>About US</h2>
      <p className={classes.about__description}>
        After the success of last year's project to help refugees and migrants
        find work as cleaners, CYF is partnering with the Coventry Refugee and
        Migrant Centre again to build another site aimed at helping migrants
        find work. The website supports our  Handyperson service,
        allowing our beneficiaries (refugees and migrants communities) to
        realise their entrepreneurial potential by providing home repairs
        services for customers across the city of Coventry.
      </p>
      <ul className={classes.about__list}>
          <li className={classes.about__list__element}><a href="https://codeyourfuture.io/" target="_blank"><img src={cyfLogo}/></a></li>
          <li className={classes.about__list__element}><a href="https://www.covrefugee.org/" target="_blank" ><img src={coventryRefLogo} /></a></li>
      </ul>
    </div>
  );
};

export default AboutSection;
