import User from "../../models/user.model";
import { UnauthorizedError } from "../error";
import JwtService from "../jwt";
import { logger } from "../logger";

export default async (req, _res, next) => {
    try {
        const { USER_TOKEN } = req.cookies;
        const decoded = new JwtService().jwtVerify(USER_TOKEN);

        if (!decoded || !decoded.username) throw new UnauthorizedError();

        const user = await User.findOne({
            where: { username: decoded.username },
        });

        if (!user) throw new UnauthorizedError();

        req.username = decoded.username;
        req.userRole = user.dataValues.role;
        next();
    } catch (e) {
        logger.error(`${e}`);
        next(e);
    }
};
