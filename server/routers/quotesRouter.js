// ROUTES RELATED TO QUOTES

const express = require("express");
const router = express.Router();
const services = require("../services/quotesSerives");

router.use(express.json());

/**
 * NOTE: code commented out as the functionallity has not been implemented yet.
 *       They are expected to be accessible only by admin
 */
// GET "/" SERVE DATA OF ALL QUOTES (currently accessible only to admin)
// router.get("/", async (_, res) => {
//   const result = await services.getAllHandymen();
//   return res.status(200).json(result);
// });

// // GET "/{id}" SERVE DATA OF INDIVIDUAL QUOTE (currently accessible only to admin)
// router.get("/:id", async (req, res) => {
//   const result = await services.getQuoteById(parseInt(req.params.id));
//   result ? res.status(200).send(result) : res.sendStatus(404);
// });
/**
 * 
 */

// POST "/" ALLOW QUOTE REQUEST DATA STORAGE (currently accessible to all site visitors)
// NOTE: this is used just to allow storage of quote request-related data provided by a potential buyer
router.post("/", async (req, res) => {
  const result = await services.addNewQuote(req.body);
  const resultStatus = result.status === "OK" ? 201 : 400;
  res.status(resultStatus).send({ message: result.message });
});

module.exports = router;
