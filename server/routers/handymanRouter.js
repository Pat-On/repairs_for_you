// ROUTES RELATED TO HANDYMEN
import { pool } from "./../db";
import authController from "./../controller/authController";

const express = require("express");
const router = express.Router();
const services = require("../services/handymanServices");

router.use(express.json());

// GET "/"
router.get("/", async (_, res) => {
	try {
		const allHandymans = await pool.query(
			"SELECT * FROM handyman WHERE visible=True"
		);

		// const testJSON = await JSON.parse(allHandymans.rows[0].address_offer);
		// return res.status(200).json({
		//   data: testJSON,
		// });

		return res.status(200).json({
			length: allHandymans.rowCount,
			data: allHandymans.rows,
		});
	} catch (error) {
		//TODO ERROR HANDLER
		console.log(error);
	}
});

router.get("/", async (_, res) => {
	const result = await services.getAllHandymen();
	return res.status(200).json(result);
});

// GET "/{id}"
// router.get("/:id", async (req, res) => {
//   const result = await services.getHandymanById(parseInt(req.params.id));
//   result ? res.status(200).send(result) : res.sendStatus(404);
// });

// !TODO: auth controller and the protection - base on the role
router.get("/adminsacceshandymans", async (_, res, next) => {
	try {
		const allHandymans = await pool.query("SELECT * FROM handyman");

		// const testJSON = await JSON.parse(allHandymans.rows[0].address_offer);
		// return res.status(200).json({
		//   data: testJSON,
		// });

		return res.status(200).json({
			length: allHandymans.rowCount,
			data: allHandymans.rows,
		});
	} catch (error) {
		//TODO ERROR HANDLER
		console.log(error);
	}
});

router.get("/adminsacceshandymans/:id", async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		//TODO: add filter that You can select only the one with visible true flag
		const oneHandyman = await pool.query(
			"SELECT * FROM handyman WHERE handyman_id = $1 ",
			[id]
		);
		res.status(200).json({
			status: "success",
			length: oneHandyman.rowCount,
			data: oneHandyman.rows[0],
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			msg: err.message,
		});
	}
});


router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		//TODO: add filter that You can select only the one with visible true flag
		const oneHandyman = await pool.query(
			"SELECT * FROM handyman WHERE handyman_id = $1 ",
			[id]
		);
		res.status(200).json({
			status: "success",
			length: oneHandyman.rowCount,
			data: oneHandyman.rows[0],
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			msg: err.message,
		});
	}
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
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
			[
				firstName,
				lastName,
				[JSON.stringify(address)],
				postcode,
				email,
				phoneNumber,
				skills,
				bio,
			]
		);
	} catch (error) {
		//TODO ERROR HANDLER
		console.log(error);
	}
});

// put method
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
        WHERE handyman_id=$3`,[firstName,lastName,email,postcode,phoneNumber,skills,handyman_id]	);

	}catch (error) {
		//TODO ERROR HANDLER
		console.log(error);
	}

});

module.exports = router;
