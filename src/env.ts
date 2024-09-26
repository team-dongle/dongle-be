import dotenv from "dotenv";
import path from "path";
import appRoot from "app-root-path";

dotenv.config({
    path: path.join(appRoot.path, `.env.${process.env.NODE_ENV}`),
});

export const env = {
    port: process.env.APP_PORT,
    origins: process.env.APP_ORIGINS.split(",") || [],
};
