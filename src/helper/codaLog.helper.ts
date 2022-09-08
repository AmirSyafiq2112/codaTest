import winston, { createLogger, format, transports } from "winston";
// import path from "path";

const logsFolder = "src/logs/";

const logFormat = format.printf(
  (info) => `${info.timestamp} ${info.level} : ${info.message}`
);

export const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    // Format the metadata object
    format.metadata({ fillExcept: ["message", "level", "timestamp"] })
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
    new transports.File({
      filename: `${logsFolder}codaLogs.log`,
      format: format.combine(
        // Render in one line in your log file.
        // If you use prettyPrint() here it will be really
        // difficult to exploit your logs files afterwards.
        format.json()
      ),
    }),
  ],
  exitOnError: false,
});
