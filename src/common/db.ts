import { Sequelize } from "sequelize";
import { env } from "./env";
import { logger } from "./logger";
import fs from "fs";
import path from "path";

const modelFiles = fs
    .readdirSync(path.join(__dirname, "/../models/"))
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

const sequelize = new Sequelize(
    env.db.schema,
    env.db.username,
    env.db.password,
    {
        host: env.db.host,
        dialect: "mysql",
        dialectOptions: {},
        port: parseInt(env.db.port, 10),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        timezone: "+09:00",
        logging: (message) => {
            if (message.includes("SELECT 1+1 AS result")) return;
            // logger.info(message);
        },
    }
);

const initialize = (sequelize: Sequelize) => {
    try {
        modelFiles.forEach(async (modelFile) => {
            const model = await import(
                path.join(__dirname, `/../models/${modelFile}`)
            );
            model.default.initialize(sequelize);
        });
    } catch (e) {
        logger.error(`Failed to initialize models: ${e}`);
    }
};

const associate = () => {
    try {
        modelFiles.forEach(async (modelFile) => {
            const model = await import(
                path.join(__dirname, `/../models/${modelFile}`)
            );

            model.default.associate();
        });
    } catch (e) {
        logger.error(`Failed to associating models: ${e}`);
    }
};

export const connect = () => {
    initialize(sequelize);
    associate();

    sequelize
        .authenticate()
        .then(() => {
            logger.info("Successfully connected to mysql server.");
            sequelize
                .sync({
                    alter: process.env.NODE_ENV === "production" ? false : true,
                })
                .then(() => {
                    logger.info(
                        "Successfully synchronized model tables to mysql server."
                    );
                })
                .catch((e) => {
                    logger.error(
                        `An Error occured while synchronizing table: ${e}`
                    );
                });
        })
        .catch((e) => {
            logger.error(
                `An Error occured while establishing test connection to mysql server. ${e}`
            );
        });
};

export { sequelize };
