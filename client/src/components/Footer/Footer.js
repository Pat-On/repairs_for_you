import React from "react";
import { Link } from "react-router-dom";

import classes from "./Footer.module.scss";
import twitter from "../../public/twitter.svg";
import facebook from "../../public/facebook.svg";
import linkedin from "../../public/linkedin.svg";
import locato from "../../public/locato.svg";
import email from "../../public/email.svg";

/**
 * @DescriptionFunction Footer is one of the part of the layout which are not changing in entire application.
 */
const Footer = (props) => {
  return (
    <footer className={classes.footer}>
      <ul className={classes.footer__listOfIcons}>
        <li>
         {/*  <a className={classes.links} href="mailto: patryk.nowak@gmail.com">
            <img src={email} alt="Email icon made by Pixel Perfect" />
          </a> */}
           <Link to={"/contact"}> <img src={email} alt="Email icon made by Pixel Perfect" /></Link>
        </li>
        <li>
          <a rel="noreferrer" className={classes.links} href="https://twitter.com/CRMCCov" target="_blank">
            <img src={twitter} alt="Twitter icon made by Pixel Perfect" />
          </a>
        </li>
        <li>
          <a rel="noreferrer" className={classes.links} target="_blank" href="https://www.facebook.com/CRMCCov/?ref=page_internal">
            <img src={facebook} alt="Facebook icon made by Pixel Perfect" />
          </a>
        </li>
        <li>
          <a rel="noreferrer" className={classes.links} target="_blank" href="">
            <img src={linkedin} alt="LinkedIn icon made by Pixel Perfect" />
          </a>
        </li>
        <li>
          <a rel="noreferrer" className={classes.links} target="_blank" href="https://goo.gl/maps/xnymgq1W7U4g3xka6">
            <img src={locato} alt="Locato icon made by Freepik" />
          </a>
        </li>
      </ul>


        <ul className={classes.footer__contactList}>
          <li>email@example.uk</li>
          <li>Building</li>
          <li>Street</li>
          <li>Birmingham</li>
          <li>B1 111</li>
        </ul>

      <div className={classes.footer__end}>
        <p>&copy; 2021 by Repairs For You Company</p>
        <p>
          A Social enterprise founded by Coventry Refugee and Migrant Centre
        </p>
        <Link to="/signin">admin</Link>{" "}
      </div>
    </footer>
  );
};

export default Footer;
