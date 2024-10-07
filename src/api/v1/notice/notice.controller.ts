import {
    BadRequestError,
    InvalidSchemaError,
    UnauthorizedError,
} from "../../../common/error";
import { logger } from "../../../common/logger";
import * as Yup from "yup";
import NoticeService from "./notice.service";
import { API_CODES } from "../../../common/api-codes";

export default class NoticeController {
    public listNotices = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const size = parseInt(req.query.size, 10) || 5;

            const schema = Yup.object().shape({
                page: Yup.number().optional(),
                size: Yup.number().optional(),
            });

            if (!(await schema.isValid({ page, size })))
                throw new InvalidSchemaError();

            const list = await new NoticeService().list(page, size);

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "SUCCESS",
                result: { page: page, ...list },
            });
        } catch (e) {
            logger.error(`${e}`);
            next(e);
        }
    };

    public noticeDetail = async (req, res, next) => {
        try {
            const id = parseInt(req.params.noticeId, 10);

            if (id < 1) throw new InvalidSchemaError();

            const result = await new NoticeService().detail(id);

            if (!result) throw new BadRequestError();

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "SUCCESS",
                result: { ...result.dataValues },
            });
        } catch (e) {
            logger.error(`${e}`);
            next(e);
        }
    };

    public createNotice = async (req, res, next) => {
        try {
            if (req.userRole < 2) throw new UnauthorizedError();
            const body = req.body;

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                content: Yup.string().required(),
                attachment: Yup.array().optional(),
            });

            if (!(await schema.isValid(body))) throw new InvalidSchemaError();

            const result = await new NoticeService().create(body);

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

    public deleteNotice = async (req, res, next) => {
        try {
            if (req.userRole < 2) throw new UnauthorizedError();
            const id = parseInt(req.params.noticeId, 10);

            if (id < 1) throw new InvalidSchemaError();

            const result = await new NoticeService().delete(id);

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
