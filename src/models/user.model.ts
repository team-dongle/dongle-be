import { DataTypes, Model, Sequelize } from "sequelize";
import Club from "./club.model";
import Notice from "./notice.model";

export default class User extends Model<IUser> {
    static initialize(sequelize: Sequelize) {
        User.init(
            {
                _id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER(),
                    allowNull: false,
                    primaryKey: true,
                },
                username: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                role: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE(),
                    defaultValue: sequelize.fn("NOW"),
                },
                updatedAt: {
                    type: DataTypes.DATE(),
                    defaultValue: sequelize.fn("NOW"),
                },
            },
            {
                sequelize,
                tableName: "users",
                modelName: "user",
                charset: "utf8",
                collate: "utf8_unicode_ci",
                timestamps: true,
            }
        );

        return User;
    }

    static associate() {
        this.hasOne(Club, {
            foreignKey: "clubId",
            sourceKey: "_id",
        });

        this.hasOne(Notice, {
            foreignKey: "author",
            sourceKey: "_id",
        });
    }
}
