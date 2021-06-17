import { Router } from "express";

const router = new Router();

router.get("/", async (_, res) => {
	res.json({ message: "Hello, world!" });
});
