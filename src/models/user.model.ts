import { DataTypes, Model } from "sequelize";
import { Club } from "./club.model";

export class User extends Model<IUser> {
    static initialize(sequelize) {
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
            },
            {
                sequelize,
                tableName: "users",
                modelName: "user",
                charset: "utf8",
                collate: "utf8_unicode_ci",
            }
        );

        return User;
    }

    static associate() {
        this.hasOne(Club, {
            foreignKey: "club",
            sourceKey: "_id",
        });
    }
}
