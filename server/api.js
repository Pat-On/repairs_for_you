import { Router } from "express";
import { pool } from "./db";
// using hard coded json file data for now
import HandyPeopleTestData from "../client/src/components/handyPeopleList/HandyPeopleTestData.json";

// console.log(query)

// const poolQuery = pool
// console.log(poolQuery)

const router = new Router();
// console.log(pool)

router.get("/", async (_, res) => {
	const client = await pool.connect();
	//  console.log(client)
	client.query("SELECT * FROM repairs_for_you").then( (response) => {
		res.status(200).json({
			data: response.rows,
		});
	});

	// poolQuery(() => `SELECT * FROM test`).then( response => {
	// 	res.status(200).json({
	// 		data: response.rows
	// 	})
	// })
	// res.json({ message: "Hello, world!" });
});

router.get("/handyPeople", (_, res) => {
	res.json(HandyPeopleTestData);
});
export default router;
