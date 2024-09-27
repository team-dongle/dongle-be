import { env } from "./env";
import express from "express";
import { logger } from "./logger";
import morganMiddleware from "./morganMiddleware";
import cors from "cors";
import * as Api from "./app.router";
import * as db from "./db";

const app = express();

// middlewares
app.use(morganMiddleware);
app.use(
    cors({
        origin: env.origins,
        credentials: true,
    })
);

// routes
app.use(Api.path, Api.router);

app.listen(env.port, async () => {
    logger.info(`Server is listening on PORT ${env.port}`);

    await db.connect();
});
