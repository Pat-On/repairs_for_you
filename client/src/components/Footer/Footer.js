import React from "react";

import classes from "./Footer.module.scss";
import twitter from "../../public/twitter.svg"
import facebook from "../../public/facebook.svg"
import linkedin from "../../public/linkedin.svg"
import locato from "../../public/locato.svg"
import email from "../../public/email.svg"




const Footer = (props) => {
  return (
    <footer className={classes.footer}>

<ul className={classes.footer__listOfIcons}>
        <li>
          <a className={classes.links} href="mailto: patryk.nowak@gmail.com">
            <img src={email} alt="Email icon made by Pixel Perfect" />
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            className={classes.links}
            href=""
            target="_blank"
          >
            <img src={twitter} alt="Twitter icon made by Pixel Perfect" />
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            className={classes.links}
            target="_blank"
            href=""
          >
            <img src={facebook} alt="Facebook icon made by Pixel Perfect" />
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            className={classes.links}
            target="_blank"
            href=""
          >
            <img src={linkedin} alt="LinkedIn icon made by Pixel Perfect" />
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            className={classes.links}
            target="_blank"
            href=""
          >
            <img src={locato} alt="Locato icon made by Freepik" />
          </a>
        </li>
      </ul>


<div>
  <ul className={classes.footer__contactList}>
    <li>email@example.uk</li>
    <li>Building</li>
    <li>Street</li>
    <li>Birmingham</li>
    <li>B1 111</li>
  </ul>
</div>

<div className={classes.footer__end}>
  <p>
    2021 by Repairs For You Company 
  </p>
  <p>
  A Social enterprise founded by Coventry Refugee and Migrant Centre
  </p>
</div>

    </footer>
  );
};

export default Footer;