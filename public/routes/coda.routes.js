"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getIAT } from "../helper/index";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const coda_controller_1 = require("../controller/coda.controller");
const router = (0, express_1.Router)();
router.get("/test", coda_controller_1.test);
router.post("/:productName", coda_controller_1.productName);
// router.post("/", coda);
exports.default = router;
