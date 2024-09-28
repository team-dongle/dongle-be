import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user.model";
import Category from "./category.model";

export default class Club extends Model<IClub> {
    static initialize(sequelize: Sequelize) {
        Club.init(
            {
                _id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER(),
                    allowNull: false,
                    primaryKey: true,
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
                owner: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                recruitPeriod: {
                    type: DataTypes.DATE(),
                    allowNull: false,
                },
                isRecruiting: {
                    type: DataTypes.BOOLEAN(),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "clubs",
                modelName: "club",
                charset: "utf8",
                collate: "utf8_unicode_ci",
            }
        );

        return Club;
    }

    static associate() {
        this.belongsTo(User, {
            foreignKey: "clubId",
            targetKey: "_id",
        });

        this.hasOne(Category, {
            foreignKey: "category",
            sourceKey: "_id",
        });
    }
}
