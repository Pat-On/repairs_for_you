import React from "react";

import classes from "./Footer.module.scss";


const Footer = (props) => {
  return (
    <footer className={classes.footer}>

<ul className={classes.footer__listOfIcons}>
        <li>
          <a className={classes.links} href="mailto: patryk.nowak@gmail.com">
            <img src="" alt="" />
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            className={classes.links}
            href=""
            target="_blank"
          >
            <img src="" alt="" />
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            className={classes.links}
            target="_blank"
            href=""
          >
            <img src="" alt="" />
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



// Twitter icon made by Freepik
// LinkedIn icon made by Pixel perfect
// Google pointer icon made by Freepik
//Facebook icon made by Pixel perfect