import { DataTypes, Model, Sequelize } from "sequelize";
import Club from "./club.model";
import Notice from "./notice.model";
import bcrypt from "bcryptjs";

export default class User extends Model<IUser> {
    static initialize(sequelize: Sequelize) {
        User.init(
            {
                _id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER(),
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                username: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                role: {
                    type: DataTypes.TINYINT({ length: 1 }),
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
                paranoid: true,
                timestamps: true,
            }
        );

        User.addHook("beforeSave", async (user: Model<IUser>) => {
            if (user.dataValues.password) {
                user.setDataValue(
                    "password",
                    await bcrypt.hash(user.dataValues.password, 8)
                );
            }
        });

        return User;
    }

    static associate() {
        this.hasOne(Notice, {
            foreignKey: "author",
            sourceKey: "_id",
        });

        this.hasOne(Club, {
            foreignKey: "ownerId",
            sourceKey: "_id",
        });
    }

    async validatePassword(password: string) {
        return await bcrypt.compare(password, this.dataValues.password);
    }
}
