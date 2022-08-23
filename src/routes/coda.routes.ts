import { response, Router } from "express";
import { getIAT } from "../helper/index";

import dotenv from "dotenv";
dotenv.config();

import { coda, productName } from "../controller/coda.controller";

const router = Router();

router.get("/:productName", productName);

router.post("/", coda);

export default router;
