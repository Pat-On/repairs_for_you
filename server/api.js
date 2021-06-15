import { Router } from "express";

import { pool } from "./db";

import bookingRouter from "./routers/bookingRouter"
// console.log(query)

// const poolQuery = pool
// console.log(poolQuery)

const router = new Router();
// console.log(pool)

router.get("/", async (_, res) => {
	 const client = await pool.connect()
	//  console.log(client)
	client.query(`SELECT * FROM users`).then( response => {
		res.status(200).json({
			data: response.rows
		})
	})

	// poolQuery(() => `SELECT * FROM test`).then( response => {
	// 	res.status(200).json({
	// 		data: response.rows
	// 	})
	// })
	// res.json({ message: "Hello, world!" });
});

export default router;
