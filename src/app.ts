import { env } from "./env";
import express from "express";
import { logger } from "./logger";
import morganMiddleware from "./morganMiddleware";
import cors from "cors";
import * as Api from "./app.router";

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

app.listen(env.port, () => {
    logger.info(`Server is listening on PORT ${env.port}`);
});
