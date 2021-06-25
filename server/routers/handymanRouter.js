// ROUTES RELATED TO HANDYMEN

const express = require("express");
const router = express.Router();
const services = require("../services/handymanServices");

router.use(express.json());

// GET "/"
router.get("/", async (_, res) => {
  const result = await services.getAllHandymen();
  return res.status(200).json(result);
});

// GET "/{id}"
router.get("/:id", async (req, res) => {
  const result = await services.getHandymanById(parseInt(req.params.id));
  result ? res.status(200).send(result) : res.sendStatus(404);
});

// POST "/"
router.post("/", async (req, res) => {
  console.log(req.body)
  const result = await services.addNewHandyman(req.body);
  const resultStatus = result.status === "OK" ? 201 : 400;
  res.status(resultStatus).send({ message: result.message });
});

module.exports = router;
