import { DataTypes, Model, Sequelize } from "sequelize";
import Category from "./category.model";
import { IClub } from "../@types/club";
import User from "./user.model";

export default class Club extends Model<IClub> {
    static initialize(sequelize: Sequelize) {
        Club.init(
            {
                _id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER(),
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                contact: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                applyUrl: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                thumbnail: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                location: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                sns: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                logo: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                detail: {
                    type: DataTypes.TEXT(),
                    allowNull: true,
                },
                recruitPeriod: {
                    type: DataTypes.DATE(),
                    allowNull: false,
                },

                isRecruiting: {
                    type: DataTypes.BOOLEAN(),
                    allowNull: false,
                    get() {
                        return this.dataValues.isRecruiting ? true : false;
                    },
                },
                createdAt: {
                    type: DataTypes.DATE(),
                    defaultValue: sequelize.fn("NOW"),
                },
                updatedAt: {
                    type: DataTypes.DATE(),
                    defaultValue: sequelize.fn("NOW"),
                },
                deletedAt: {
                    type: DataTypes.DATE(),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "clubs",
                modelName: "club",
                charset: "utf8",
                collate: "utf8_unicode_ci",
                paranoid: true,
                timestamps: true,
            }
        );

        return Club;
    }

    static associate() {
        this.belongsTo(Category, {
            foreignKey: "categoryId",
            as: "category",
            targetKey: "_id",
        });

        this.belongsTo(User, {
            foreignKey: "ownerId",
            as: "owner",
            targetKey: "_id",
        });
    }
}
