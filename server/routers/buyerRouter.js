/***
 *
 * WARN: THIS FILE IS CURRENTLY NOT BEING USED. IT IS PREPARED IN LIGHT OF PROBABLE FUTURE NEED.
 *
 */

// ROUTES RELATED TO BUYERS

const express = require("express");
const router = express.Router();
const services = require("../services/buyerServices");

router.use(express.json());

/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/

// WARN: ANY REQUIRED AUTHORISATION LOGIC IS YET TO BE ADDED

// GET "/" SERVE DATA OF ALL BUYERS
router.get("/admin", async (_, res) => {
  const result = await services.getAllBuyersForAdmin();
  return res.status(200).json(result);
});

// GET "/{id}" SERVE DATA OF INDIVIDUAL BUYER
router.get("/admin/:id", async (req, res) => {
  const result = await services.getBuyerByIdForAdmin(parseInt(req.params.id));
  return result ? res.status(200).send(result) : res.sendStatus(404);
});

/******************************************************************************************************/

/***************** THE FOLLOWING METHODS ARE ACCESSIBLE TO ALL PUBLIC ROUTES *******************/

// GET "/" SERVE DATA OF ALL BUYERS
router.get("/", async (_, res) => {
  const result = await services.getAllBuyers();
  return res.status(200).json(result);
});

// GET "/{id}" SERVE DATA OF INDIVIDUAL BUYER
router.get("/:id", async (req, res) => {
  const result = await services.getBuyerById(parseInt(req.params.id));
  return result ? res.status(200).send(result) : res.sendStatus(404);
});

// POST "/" ALLOW BUYER DATA STORAGE
// Note: this is used only during the initial stage of quote requesting process (accessible to anyone...
// ...who would like to send quote reqeust to a buyer on the site)
router.post("/", async (req, res) => {
  const result = await services.addNewBuyer(req.body);
  const resultStatus = result.status === "OK" ? 201 : 400;
  return res.status(resultStatus).send({ message: result.message });
});

module.exports = router;
