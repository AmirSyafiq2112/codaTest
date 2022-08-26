import winston, { createLogger, format, transports } from "winston";

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
    filename: `${logsFolder}codaLogs.log`,
  }),
  new transports.File({
    level: "warn",
    filename: `${logsFolder}codaLogs.log`,
  }),
];

export const logger = createLogger({
  transports: loggerTransport,
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.prettyPrint()
  ),
});

export const requestLogger = createLogger({
  transports: loggerRequestTransport,
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.prettyPrint()
  ),
});
