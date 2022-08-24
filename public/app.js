"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coda_routes_js_1 = __importDefault(require("./routes/coda.routes.js"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)()); //json must have ()
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/", coda_routes_js_1.default);
//middleware: error handling
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
    next();
});
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
