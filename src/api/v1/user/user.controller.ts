import {
    BadRequestError,
    InvalidSchemaError,
    NotFoundError,
    UnauthorizedError,
} from "../../../common/error";
import { logger } from "../../../common/logger";
import * as Yup from "yup";
import { API_CODES } from "../../../common/api-codes";
import UserService from "./user.service";
import { UniqueConstraintError } from "sequelize";

export default class UserController {
    public getProfile = async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                username: Yup.string().required(),
            });

            if (!(await schema.isValid({ username: req.username })))
                throw new InvalidSchemaError();

            const user = await new UserService().findUser(req.username);

            if (!user) throw new NotFoundError();

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "OK",
                result: { name: user.dataValues.name },
            });
        } catch (e) {
            logger.error(`${e}`);
            next(e);
        }
    };

    public createUser = async (req, res, next) => {
        try {
            const role = req.userRole;
            const body = req.body;

            if (role < 2) throw new UnauthorizedError();

            const schema = Yup.object().shape({
                username: Yup.string().required().min(8),
                password: Yup.string().required().min(8),
                name: Yup.string().required(),
                role: Yup.number().required().min(1).max(1),
            });

            if (!(await schema.isValid(body))) throw new InvalidSchemaError();

            const result = await new UserService()
                .createUser(body)
                .catch((e) => {
                    if (e instanceof UniqueConstraintError) {
                        throw new BadRequestError();
                    }
                });

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "SUCCESS",
            });
        } catch (e: any) {
            logger.error(`${e}`);
            next(e);
        }
    };
}
