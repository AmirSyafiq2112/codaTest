"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = exports.logger = void 0;
const winston_1 = require("winston");
const logsFolder = "src/logs/";
const loggerTransport = [
    new winston_1.transports.File({
        level: "info",
        filename: `${logsFolder}logs.log`,
    }),
];
const loggerRequestTransport = [
    new winston_1.transports.File({
        level: "warn",
        filename: `${logsFolder}requestWarnings.log`,
    }),
    new winston_1.transports.File({
        level: "error",
        filename: `${logsFolder}requestErrors.log`,
    }),
];
if (process.env.development !== "production") {
    loggerTransport.push(new winston_1.transports.File({
        level: "info",
        filename: `${logsFolder}requestInfo.log`,
    }));
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
exports.logger = (0, winston_1.createLogger)({
    transports: loggerTransport,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint()),
});
exports.requestLogger = (0, winston_1.createLogger)({
    transports: loggerRequestTransport,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint()),
});
