import winston, { format } from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logfileDir = `${process.cwd()}/logs`;

const logFormat = format.printf(
    ({ level, message, label, timestamp }) =>
        `${timestamp} [${label}] ${level}: ${message}`
);

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.label({ label: "Dongle" }),
        logFormat
    ),
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logfileDir,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logfileDir + "/error",
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
    // logging exception
    exceptionHandlers: [
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logfileDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

// production 환경이 아닐 시 console에 logging
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        })
    );
}

export { logger };
