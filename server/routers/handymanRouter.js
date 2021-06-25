// ROUTES RELATED TO HANDYMEN
import { pool } from "./../db";

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
// router.post("/", async (req, res) => {
//   console.log(req.body)
//   const result = await services.addNewHandyman(req.body);
//   const resultStatus = result.status === "OK" ? 201 : 400;
//   res.status(resultStatus).send({ message: result.message });
// });

// POST "/"
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    // address - object, skills - array
    const {
      firstName,
      lastName,
      // img,
      address,
      postcode,
      email,
      phoneNumber,
      skills,
      bio,
    } = req.body;
    console.log(bio);

    // '{"sector1", "sector2"}'
    const newArrayString = skills.map((item) => `"${item}"`);
    console.log(newArrayString.join(", "));

    const _ = await pool.query(
      `INSERT INTO handyman (first_name, last_name,  address_offer, postcode, email, phone_number, skills, bio)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [ firstName, lastName, [ JSON .stringify(address)], postcode,  email, phoneNumber, skills, bio ]
    );
  } catch (error) {
    //TODO ERROR HANDLER
    console.log(error);
  }
});

module.exports = router;
