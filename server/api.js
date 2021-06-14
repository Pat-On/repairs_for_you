import { Router } from "express";
import HandyPeopleTestData from "../client/src/handyPeopleList/HandyPeopleTestData.json";
const router = new Router();
router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/handyPeople", (_, res) => {
	res.json(HandyPeopleTestData);
});

export default router;
