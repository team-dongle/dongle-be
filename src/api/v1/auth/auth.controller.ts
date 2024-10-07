import * as Yup from "yup";
import AuthService from "./auth.service";
import {
    BadRequestError,
    InvalidSchemaError,
    UnauthorizedError,
} from "../../../common/error";
import { logger } from "../../../common/logger";
import { API_CODES } from "../../../common/api-codes";
import { CookieOptions } from "express";
import { env } from "../../../common/env";
import JwtService from "../../../common/jwt";

export default class AuthController {
    public login = async (req, res, next) => {
        let token;
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
            domain: env.cookie.domain,
            path: "/",
        };

        try {
            const schema = Yup.object().shape({
                username: Yup.string().required(),
                password: Yup.string().required(),
            });

            const { username, password } = JSON.parse(JSON.stringify(req.body));
            if (!(await schema.isValid({ username, password })))
                throw new InvalidSchemaError();

            const user = await new AuthService().findUser(username);
            if (!user || !(await user.validatePassword(password)))
                throw new BadRequestError();

            token = new JwtService().jwtSign({
                username: user.dataValues.username,
            });

            res.status(API_CODES.OK)
                .cookie("USER_TOKEN", token, cookieOptions)
                .json({ code: API_CODES.OK, message: "OK" });
        } catch (e: any) {
            logger.error(`${e}`);
            next(e);
        }
    };

    public logout = (req, res, next) => {
        const token = req.cookies.USER_TOKEN;

        try {
            if (!token) throw new UnauthorizedError();

            res.status(API_CODES.OK)
                .cookie("USER_TOKEN", "", { maxAge: 0 })
                .json({ code: API_CODES.OK, message: "OK" });
        } catch (e: any) {
            logger.error(`${e}`);
            next(e);
        }
    };
}
