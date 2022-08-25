import { createLogger, transports, format } from "winston";
import winston from "winston";
const logsFolder = "src/logs/";

const loggerTransport = [
	new transports.File({
		level: "info",
		filename: `${logsFolder}logs.log`,
	}),
];

const loggerRequestTransport = [
	new transports.File({
		level: "warn",
		filename: `${logsFolder}requestWarnings.log`,
	}),
	new transports.File({
		level: "error",
		filename: `${logsFolder}requestErrors.log`,
	}),
];

if (process.env.development !== "production") {
	loggerTransport.push(
		new transports.File({
			level: "info",
			filename: `${logsFolder}requestInfo.log`,
		})
	);
}

// export const logger = winston.createLogger({
// 	level: "info",
// 	format: winston.format.json(),
// 	defaultMeta: { service: "user-service" },
// 	transports: [
// 		//
// 		// - Write all logs with importance level of `error` or less to `error.log`
// 		// - Write all logs with importance level of `info` or less to `combined.log`
// 		//
// 		new winston.transports.File({ filename: "error.log", level: "error" }),
// 		new winston.transports.File({
// 			filename: `src/logs/combined.log`,
// 		}),
// 	],
// });
// // console.log(__dirname);
// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== "production") {
// 	logger.add(
// 		new winston.transports.Console({
// 			format: winston.format.simple(),
// 		})
// 	);
// }
// // console.log(process.env.NODE_ENV);

// logger.info("holla");
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production") {
// 	logger.add(
// 		new winston.transports.Console({
// 			format: winston.format.simple(),
// 		})
// 	);
// }

export const logger = createLogger({
	transports: loggerTransport,
	format: format.combine(
		format.timestamp(),
		format.json(),
		format.prettyPrint()
	),
});

export const requestLogger = createLogger({
	transports: loggerRequestTransport,
	format: format.combine(
		format.timestamp(),
		format.json(),
		format.prettyPrint()
	),
});
