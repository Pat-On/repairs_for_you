// ROUTES RELATED TO HANDYMEN

const express = require("express");
const router = express.Router();
const services = require("../services/handymanServices");

router.use(express.json());




/***************** THE FOLLOWING METHODS ARE ACCESSIBLE TO ALL PUBLIC ROUTES *******************/

// GET "/" SERVE DATA OF ALL HANDYMEN (accessible to anyone visiting the site)
router.get("/", async (_, res) => {
  const result = await services.getAllHandymen();
  return res.status(200).json(result);

});

// GET "/{id}" SERVE DATA OF INDIVIDUAL HANDYMAN
router.get("/:id", async (req, res) => {
  const result = await services.getHandymanById(parseInt(req.params.id));
  return result ? res.status(200).send(result) : res.sendStatus(404);
});

// POST "/" ALLOW HANDYMAN DATA STORAGE
// Note: this is used only during the initial stage of handyman registration process (accessible to anyone... 
// ...who would like to rgister as handyman on the site)
router.post("/", async (req, res) => {
  const result = await services.addNewHandyman(req.body);
  const resultStatus = result.status === "OK" ? 201 : 400;
  return res.status(resultStatus).send({ message: result.message });
});

// put method for editing handyman details
router.put("/adminsacceshandymans/:id", async (req, res) => {
	try{
		const handyman_id=req.params.id;
		console.log(req.body);
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
		const _ = await pool.query(`UPDATE handyman
    SET first_name = $1,
        last_name= $2,
        address_offer=$3,
        email=$4,
        phone_number=$5,
        skills=$6,
		   	postcode=$7
        WHERE handyman_id=$3`,[firstName,lastName,email,address,postcode,phoneNumber,skills,handyman_id]	);
	}catch (error) {
		//TODO ERROR HANDLER
		console.log(error);
	}
});



/***************** THE FOLLOWING METHODS ARE DEDICATED TO ADMIN-ACCESSIBLE ROUTES *******************/

// WARN: ANY REQUIRED AUTHORISATION LOGIC IS YET TO BE ADDED

// GET "/" SERVE DATA OF ALL HANDYMEN (accessible to anyone visiting the site)
router.get("/admin", async (_, res) => {
  const result = await services.getAllHandymenForAdmin();
  return res.status(200).json(result);
});

// GET "/{id}" SERVE DATA OF INDIVIDUAL HANDYMAN
router.get("/admin/:id", async (req, res) => {
  const result = await services.getHandymanByIdForAdmin(
    parseInt(req.params.id)
  );
  return result ? res.status(200).send(result) : res.sendStatus(404);
});

// PATCH "/" LET ADMIN CONTROL THE VISIBILITY OF A HANDYMAN'S PROFILE ON THE SITE(?)
router.patch("/admin/:id", async (req, res) => {
  const result = await services.changeHandymanVisibilityByAdmin(req.body);
  const resultStatus = result.status === "OK" ? 200 : 400;
  return res.status(resultStatus).json({ message: result.message });
});


/******************************************************************************************************/

module.exports = router;
