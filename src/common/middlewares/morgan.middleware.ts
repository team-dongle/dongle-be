import { env } from "../env";
import morgan from "morgan";
import { logger } from "../logger";

const format = env.port === "production" ? "combined" : "dev";

const stream = {
    write: (message) =>
        logger.info(
            message.replace(
                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
                ""
            )
        ),
};

const skip = (_, res) => {
    if (process.env.NODE_ENV === "production") return res.statusCode < 400;
    return false;
};

export default morgan(format, { stream, skip });
