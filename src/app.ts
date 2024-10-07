import { env } from "./common/env";
import express from "express";
import { logger } from "./common/logger";
import morganMiddleware from "./common/middlewares/morgan.middleware";
import errorHandler from "./common/middlewares/error.middleware";
import cors from "cors";
import * as Api from "./app.router";
import * as db from "./common/db";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: env.origins,
        credentials: true,
    })
);

app.use(Api.path, Api.router);

app.use(morganMiddleware);
app.use(errorHandler);

app.listen(env.port, async () => {
    logger.info(`Server is listening on PORT ${env.port}`);

    await db.connect();
});
