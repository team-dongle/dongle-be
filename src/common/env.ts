import dotenv from "dotenv";
import path from "path";
import appRoot from "app-root-path";

dotenv.config({
    path: path.join(appRoot.path, `.env.${process.env.NODE_ENV}`),
});

export const env = {
    port: process.env.APP_PORT,
    origins: process.env.APP_ORIGINS.split(",") || [],
    db: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        schema: process.env.MYSQL_DATABASE,
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        expire: process.env.JWT_EXPIRE,
    },
    cookie: {
        domain: process.env.COOKIE_DOMAIN,
    },
};
