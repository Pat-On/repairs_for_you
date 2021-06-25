// ROUTES RELATED TO HANDYMEN

const express = require("express");
const router = express.Router();
const services = require("../services/handymanServices");

router.use(express.json());

// GET "/" SERVE DATA OF ALL HANDYMEN (accessible to anyone visiting the site)
router.get("/", async (_, res) => {
  const result = await services.getAllHandymen();
  return res.status(200).json(result);
});

// GET "/{id}" SERVE DATA OF INDIVIDUAL HANDYMAN
router.get("/:id", async (req, res) => {
  const result = await services.getHandymanById(parseInt(req.params.id));
  result ? res.status(200).send(result) : res.sendStatus(404);
});

// POST "/" ALLOW HANDYMAN DATA STORAGE
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone... 
// ...who would like to rgister as handyman on the site)
router.post("/", async (req, res) => {
  const result = await services.addNewHandyman(req.body);
  const resultStatus = result.status === "OK" ? 201 : 400;
  res.status(resultStatus).send({ message: result.message });
});

module.exports = router;
