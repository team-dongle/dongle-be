import jwt from "jsonwebtoken";
import { logger } from "./logger";
import { env } from "./env";
import { Request } from "express";

export default class JwtService {
    public jwtSign = (payload: { username: string }) => {
        try {
            return jwt.sign({ username: payload.username }, env.jwt.secret, {
                expiresIn: parseInt(env.jwt.expire, 10),
            });
        } catch (e) {
            logger.error(`An error occured while JWT Sign: ${e}`);
        }
    };

    public jwtVerify = (token: string) => {
        try {
            const decode = jwt.verify(token, env.jwt.secret);
            return decode;
        } catch (e) {
            logger.error(`An error occured while verifying jwt token: ${e}`);
            return null;
        }
    };

    public extractToken = (req: Request) => {
        const bearer = req.headers.authorization;
        return bearer.includes("Bearer") ? bearer.split(" ")[1] : bearer;
    };
}
