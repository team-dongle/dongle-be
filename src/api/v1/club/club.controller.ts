import {
    BadRequestError,
    InvalidSchemaError,
    NotFoundError,
    UnauthorizedError,
} from "../../../common/error";
import { logger } from "../../../common/logger";
import * as Yup from "yup";
import ClubService from "./club.service";
import { API_CODES } from "../../../common/api-codes";
import ClubRepository from "./club.repository";
import User from "../../../models/user.model";

export default class ClubController {
    private urlReg: RegExp =
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

    public list = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const size = parseInt(req.query.size, 10) || 5;

            const schema = Yup.object().shape({
                page: Yup.number().optional(),
                size: Yup.number().optional(),
            });

            if (!(await schema.isValid({ page: page, size: size })))
                throw new InvalidSchemaError();

            const list = await new ClubService().getClubList(page, size);

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

    public search = async (req, res, next) => {
        try {
            const { keyword, category } = req.query;
            const page = parseInt(req.query.page, 10) || 1;
            const size = parseInt(req.query.size, 10) || 5;

            const schema = Yup.object().shape({
                keyword: Yup.string().required().min(2),
                category: Yup.string().optional().min(2),
                page: Yup.number().optional(),
                size: Yup.number().optional(),
            });

            if (!(await schema.isValid({ keyword, category, page, size })))
                throw new InvalidSchemaError();

            const list = await new ClubRepository().search(
                keyword,
                category,
                page,
                size
            );

            if (list.count <= 0) throw new NotFoundError();

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

    public detail = async (req, res, next) => {
        try {
            const { clubId } = req.params;
            const schema = Yup.object().shape({
                clubId: Yup.number().required(),
            });

            if (!(await schema.isValid({ clubId: clubId })))
                throw new InvalidSchemaError();

            const club = await new ClubService().getClubDetail(
                parseInt(clubId, 10)
            );

            if (!club) throw new NotFoundError();

            res.status(API_CODES.OK).json({
                code: API_CODES.OK,
                message: "SUCCESS",
                result: club.dataValues,
            });
        } catch (e) {
            logger.error(`${e}`);
            next(e);
        }
    };

    public create = async (req, res, next) => {
        const urlRegex = this.urlReg;

        try {
            if (req.userRole < 2) throw new UnauthorizedError();
            const body = req.body;

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                contact: Yup.string().required(),
                applyUrl: Yup.string().required().matches(urlRegex),
                thumbnail: Yup.string().required().matches(urlRegex),
                location: Yup.string().required(),
                sns: Yup.string().required().matches(urlRegex),
                logo: Yup.string().required().matches(urlRegex),
                ownerId: Yup.number().required(),
                recruitPeriod: Yup.date().optional(),
                isRecruiting: Yup.boolean().required(),
                categoryId: Yup.number().required(),
            });

            if (!(await schema.isValid(body))) throw new InvalidSchemaError();

            const result = await new ClubService().createClub(body);

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

    public delete = async (req, res, next) => {
        try {
            if (req.userRole < 2) throw new UnauthorizedError();

            const clubId = req.params.clubId;

            const result = await new ClubService().deleteClub(clubId);
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

    public update = async (req, res, next) => {
        const urlRegex = this.urlReg;

        try {
            if (req.userRole < 2) throw new UnauthorizedError();

            const clubId = parseInt(req.params.clubId, 10);
            const body = req.body;

            if (!clubId) throw new BadRequestError();

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                contact: Yup.string().required(),
                applyUrl: Yup.string().required().matches(urlRegex),
                thumbnail: Yup.string().required().matches(urlRegex),
                location: Yup.string().required(),
                sns: Yup.string().required().matches(urlRegex),
                logo: Yup.string().required().matches(urlRegex),
                recruitPeriod: Yup.date().optional(),
                isRecruiting: Yup.boolean().required(),
            });

            if (!(await schema.isValid(body))) throw new InvalidSchemaError();

            const result = await new ClubService().updateClub(clubId, body);

            if (result[0] <= 0) throw new BadRequestError();

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
