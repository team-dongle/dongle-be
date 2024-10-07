import { Op, Sequelize, WhereOptions } from "sequelize";
import Club from "../../../models/club.model";
import Category from "../../../models/category.model";
import { IClub } from "../../../@types/club";
import User from "../../../models/user.model";

export default class ClubRepository {
    public list = async (page?: number, size?: number) => {
        return Club.findAndCountAll({
            limit: size,
            offset: size * (page - 1),
            order: [["_id", "ASC"]],
            where: { deletedAt: null },
            include: [
                {
                    model: Category,
                    attributes: ["_id", "name"],
                    as: "category",
                },
                {
                    model: User,
                    as: "owner",
                    attributes: ["_id", "name"],
                },
            ],
            attributes: {
                exclude: ["categoryId", "ownerId"],
            },
        });
    };

    public search = async (
        keyword: string,
        category?: string,
        page?: number,
        size?: number
    ) => {
        let where: WhereOptions<IClub> = {};

        if (category) where.name = category;

        return Club.findAndCountAll({
            where: { name: { [Op.like]: `%${keyword}%` }, deletedAt: null },
            limit: size,
            offset: size * (page - 1),
            order: [["_id", "ASC"]],
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["_id", "name"],
                    where: where,
                },
                {
                    model: User,
                    as: "owner",
                    attributes: ["_id", "name"],
                },
            ],
            attributes: {
                exclude: ["categoryId", "ownerId"],
            },
        });
    };

    public detail = async (_id: number) => {
        return Club.findOne({
            where: { _id: _id },
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["_id", "name"],
                },
                {
                    model: User,
                    as: "owner",
                    attributes: ["_id", "name"],
                },
            ],
            attributes: { exclude: ["clubCategory"] },
        });
    };

    public create = async (clubData: IClub) => {
        return Club.create({ ...clubData });
    };

    public delete = async (clubId: IClub["_id"]) => {
        return Club.destroy({ where: { _id: clubId } });
    };

    public update = async (clubId: IClub["_id"], clubData: Partial<IClub>) => {
        return Club.update({ ...clubData }, { where: { _id: clubId } });
    };
}
