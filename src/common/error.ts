import { API_CODES } from "./api-codes";

class BaseError extends Error {
    public statusCode: number;
    public detail: string;

    constructor(message: string, statusCode: number, detail?: string) {
        super(message);
        this.statusCode = statusCode;
        this.detail = detail;
    }
}

export class NotFoundError extends BaseError {
    constructor(detail?: string) {
        super("NOT_FOUND", API_CODES.NOT_FOUND, detail || undefined);
    }
}

export class BadRequestError extends BaseError {
    constructor(detail?: string) {
        super("BAD_REQUEST", API_CODES.BAD_REQUEST, detail || undefined);
    }
}

export class InvalidSchemaError extends BaseError {
    constructor(detail?: string) {
        super("INVALID_SCHEMA", API_CODES.BAD_REQUEST, detail || undefined);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(detail?: string) {
        super("UNAUTHORIZED", API_CODES.UNAUTHORIZED, detail || undefined);
    }
}

export class ForbiddenError extends BaseError {
    constructor(detail?: string) {
        super("FORBIDDEN", API_CODES.FORBIDDEN, detail || undefined);
    }
}

export class InternalServerError extends BaseError {
    constructor(detail?: string) {
        super(
            "INTERNAL_SERVER_ERROR",
            API_CODES.INTERNAL_SERVER_ERROR,
            detail || undefined
        );
    }
}
