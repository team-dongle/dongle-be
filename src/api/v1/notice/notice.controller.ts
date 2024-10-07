import { InvalidSchemaError } from "../../../common/error";
import { logger } from "../../../common/logger";
import * as Yup from "yup";
import NoticeService from "./notice.service";
import { API_CODES } from "../../../common/api-codes";

export default class NoticeController {
    public listNotices = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 5;

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
}
