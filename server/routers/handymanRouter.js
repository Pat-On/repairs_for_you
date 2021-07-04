// ROUTES RELATED TO HANDYMEN

const express = require("express");
const router = express.Router();
const services = require("../services/handymanServices");
import authController from "./../controller/authController";
import handymanController from "./../controller/handymanController";

// router.use(express.json()); // You Do not need to put it here because You already have it in app.js

/***************** THE FOLLOWING METHODS ARE ACCESSIBLE TO ALL PUBLIC ROUTES *******************/

// GET "/" SERVE DATA OF ALL HANDYMEN (accessible to anyone visiting the site)
router.get("/handymannotprotected", async (_, res) => {
  const result = await services.getAllHandymen();
  return res.status(200).json(result);
});

// POST "/" ALLOW HANDYMAN DATA STORAGE
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone...
// ...who would like to rgister as handyman on the site)
router.post("/handymannotprotected", async (req, res) => {
  const result = await services.addNewHandyman(req.body);
  console.log("********************************************* I hit post");
  const resultStatus = result.status === "OK" ? 201 : 400;
  return res.status(resultStatus).send({ message: result.message });
});

// Serving three random handyman which has set visibility to true
router.get(
  "/handymannotprotected/randomthree",
  handymanController.threeRandomHandyman
);

// GET ALL REVIEWS BY HANDYMAN ID
// WARN: THIS ENDPOINT IS CURRENTLY NOT BEING USED. IT IS INCLUDED IN LIGHT OF PROBABLE FUTURE NEEDS
router.get("/handymannotprotected/:id/reviews", async (req, res) => {
  const result = await services.getReviewsByHandymanId(parseInt(req.params.id));
  return result ? res.status(200).send(result) : res.sendStatus(404);
});

// GET "/{id}" SERVE DATA OF INDIVIDUAL HANDYMAN
router.get("/handymannotprotected/:id", async (req, res) => {
  const result = await services.getHandymanById(parseInt(req.params.id));
  return result ? res.status(200).send(result) : res.sendStatus(404);
});

/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/

/**
 * Routes are only accessible for logged in admin
 */
router.use(authController.protect);
router.use(authController.restrictTo("admin"));

// GET "/" SERVE DATA OF ALL HANDYMEN (accessible to anyone visiting the site)
router.get("/handymanprotected", async (_, res) => {
  const result = await services.getAllHandymenForAdmin();
  return res.status(200).json(result);
});

router
  .route("/handymanprotected/:id")
  .put(async (req, res) => {
    try {
      const handyman_id = req.params.id;
      const {
        firstName,
        lastName,
        // img,
        address,
        postcode,
        email,
        phoneNumber,
        skills,
      } = req.body;
      console.log(firstName);
      const _ = await pool.query(
        `UPDATE handyman
    SET first_name = $1,
        last_name= $2,
        address_offer=$3,
        email=$4,
        phone_number=$5,
        skills=$6,
		   	postcode=$7
        WHERE handyman_id=$3`,
        [
          firstName,
          lastName,
          email,
          address,
          postcode,
          phoneNumber,
          skills,
          handyman_id,
        ]
      );
    } catch (error) {
      //TODO ERROR HANDLER
      console.log(error);
    }
  })
  //// GET "/{id}" SERVE DATA OF INDIVIDUAL HANDYMAN
  .get(async (req, res) => {
    const result = await services.getHandymanByIdForAdmin(
      parseInt(req.params.id)
    );
    return result ? res.status(200).send(result) : res.sendStatus(404);
  })
  // PATCH "/" LET ADMIN CONTROL THE VISIBILITY OF A HANDYMAN'S PROFILE ON THE SITE(?)
  .patch(async (req, res) => {
    const result = await services.changeHandymanVisibilityByAdmin(req.body);
    const resultStatus = result.status === "OK" ? 200 : 400;
    return res.status(resultStatus).json({ message: result.message });
  });

/******************************************************************************************************/

module.exports = router;
