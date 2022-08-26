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
        filename: `${logsFolder}codaLogs.log`,
    }),
    new winston_1.transports.File({
        level: "warn",
        filename: `${logsFolder}codaLogs.log`,
    }),
];
exports.logger = (0, winston_1.createLogger)({
    transports: loggerTransport,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.simple(), winston_1.format.prettyPrint()),
});
exports.requestLogger = (0, winston_1.createLogger)({
    transports: loggerRequestTransport,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.simple(), winston_1.format.prettyPrint()),
});
