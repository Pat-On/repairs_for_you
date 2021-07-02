import React, { useEffect, useState } from "react";
import classes from "./CustomerSection.module.scss";

import backgroundVideo from "../../../public/ConstructionWorkersDESKTOP.mp4";
import CustomerCommentMain from "./customerCommentMain/CustomerCommentMain";
import HandymanProfileMain from "./handymanProfileMain/handymanProfileMain";

import Spinner from "../../../UI/Spinner/Spinner";

/**
 * @DescriptionFunction Sub component used in MainPage component
 */
const CustomerSection = (props) => {
  const [handymenProfiles, setHandymanProfiles] = useState([]);
  useEffect(async () => {
    try {
      const dataRAW = await fetch(
        "/api/v1/handyman/handymannotprotected/randomthree"
      );
      const data = await dataRAW.json()
      const threeHandyman = data.data
      console.log(threeHandyman)
      setHandymanProfiles(threeHandyman)
    } catch (error) {
      // after functionality TODO: error handling
      console.log(error);
    }
  }, []);

  //!TODO: style in nice way spinner or to put it into the container (?)
  // but first functionality!
  let usersComments = <Spinner />;

  if (handymenProfiles.length !== 0) {
    usersComments = handymenProfiles.map((item) => (
      <HandymanProfileMain key={item.id} item={item} />
    ));
  }

  return (
    <div className={classes.customers}>
      <div className={classes.customers__bgVideo}>
        <video
          className={classes.customers__bgVideo__video}
          autoPlay
          muted
          loop
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser is not supported!
        </video>
      </div>
      <h2 className={classes.customers__heading}> Happy Customers </h2>
      <div className={classes.customers__commentContainer}>{usersComments}</div>
    </div>
  );
};

export default CustomerSection;
