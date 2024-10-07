import {
    BadRequestError,
    InvalidSchemaError,
    NotFoundError,
    UnauthorizedError,
} from "../../../common/error";
import { API_CODES } from "../../../common/api-codes";
import { logger } from "../../../common/logger";
import CategoryService from "./category.service";
import * as Yup from "yup";

export default class CategoryController {
    public categoryList = async (req, res, next) => {
        try {
            const list = await new CategoryService().list();

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "SUCCESS",
                result: { ...list },
            });
        } catch (e) {
            logger.error(`${e}`);
            next(e);
        }
    };

    public createCategory = async (req, res, next) => {
        try {
            if (req.userRole < 2) throw new UnauthorizedError();

            const body = req.body;

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                slug: Yup.string().required(),
            });

            if (!(await schema.isValid(body))) throw new InvalidSchemaError();

            const result = await new CategoryService().createCategory(body);

            if (!result) throw new BadRequestError();

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "SUCCESS",
            });
        } catch (e) {
            logger.error(`${e}`);
            next(e);
        }
    };

    public deleteCategory = async (req, res, next) => {
        try {
            if (req.userRole < 2) throw new UnauthorizedError();

            const categoryId = parseInt(req.params.categoryId, 10);

            const schema = Yup.number().required();

            if (!(await schema.isValid(categoryId)))
                throw new InvalidSchemaError();

            const result = await new CategoryService().deleteCategory(
                categoryId
            );

            if (!result) throw new BadRequestError();

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "SUCCESS",
            });
        } catch (e) {
            logger.error(`${e}`);
            next(e);
        }
    };

    public updateCategory = async (req, res, next) => {
        try {
            if (req.userRole < 2) throw new UnauthorizedError();

            const categoryId = parseInt(req.params.categoryId, 10);
            const body = req.body;

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                slug: Yup.string().required(),
            });

            if (!(await schema.isValid(body))) throw new InvalidSchemaError();

            const result = await new CategoryService().updateCategory(
                categoryId,
                body
            );

            if (!result) throw new BadRequestError();

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "SUCCESS",
            });
        } catch (e) {
            logger.error(`${e}`);
            next(e);
        }
    };
}
