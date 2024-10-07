import { API_CODES } from "../api-codes";
import { logger } from "../logger";

export default (err, _req, res, _next) => {
    res.status(err.statusCode || API_CODES.INTERNAL_SERVER_ERROR).json({
        code: err.statusCode || API_CODES.INTERNAL_SERVER_ERROR,
        message: err.message,
        detail: err.detail || undefined,
    });
};
