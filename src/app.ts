import express from "express";
import router from "./routes/coda.routes.js";
import { json, urlencoded } from "body-parser";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(json);

app.use(urlencoded({ extended: true }));

app.use("/", router);

//middleware: error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
    next();
  }
);

app.listen(5000, () => {
  console.log("server is running");
});
