import { response, Router } from "express";
// import { getIAT } from "../helper/index";

import dotenv from "dotenv";
dotenv.config();

import { productName, test } from "../controller/coda.controller";

const router = Router();

router.get("/test", test);

router.post("/:productName", productName);

// router.post("/", coda);

export default router;
