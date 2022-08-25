import express from "express";
import router from "./routes/coda.routes.js";
import { json, urlencoded } from "body-parser";
import expressWinston from "express-winston";
import { logger, requestLogger } from "./helper/logger";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(json()); //json must have ()

app.use(urlencoded({ extended: true }));

app.use(
	expressWinston.logger({
		winstonInstance: requestLogger,
		statusLevels: true,
	})
);

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");

app.use("/coda", router);

app.use(
	expressWinston.errorLogger({
		winstonInstance: logger,
	})
);

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

app.listen(3000, () => {
	console.log("server is running on port 3000");
});
