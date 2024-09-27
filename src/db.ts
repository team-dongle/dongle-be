import { Sequelize } from "sequelize";
import { env } from "./env";
import { logger } from "./logger";
import { User } from "./models/user.model";
import { Club } from "./models/club.model";

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
            logger.info(message);
        },
    }
);

export const connect = async () => {
    User.initialize(sequelize);
    Club.initialize(sequelize);

    User.associate();
    Club.associate();

    sequelize
        .authenticate()
        .then(() => {
            logger.info("Successfully connected to mysql server.");
            sequelize
                .sync()
                .then(() => {
                    logger.info(
                        "Successfully created model tables to mysql server."
                    );
                })
                .catch((e) => {
                    logger.error(`An Error occured while create table: ${e}`);
                });
        })
        .catch((e) => {
            logger.error(
                `An Error occured while establishing test connection to mysql server. ${e}`
            );
        });
};

export { sequelize };
