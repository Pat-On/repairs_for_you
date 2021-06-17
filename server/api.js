import { Router } from "express";
import { pool } from "./db";
// using hard coded json file data for now
import HandyPeopleTestData from "../client/src/components/handyPeopleList/HandyPeopleTestData.json";

// console.log(query)

// const poolQuery = pool
// console.log(poolQuery)


const router = new Router();

router.get("/", async (_, res) => {
  res.json({ message: "Hello, world!" });
});
