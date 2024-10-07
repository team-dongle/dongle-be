import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user.model";

export default class Notice extends Model<INotice> {
    static initialize(sequelize: Sequelize) {
        Notice.init(
            {
                _id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER(),
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                title: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                content: {
                    type: DataTypes.STRING(50),
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
                deletedAt: {
                    type: DataTypes.DATE(),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "notices",
                modelName: "notice",
                charset: "utf8",
                collate: "utf8_unicode_ci",
                paranoid: true,
                timestamps: true,
            }
        );
    }

    static associate() {
        this.belongsTo(User, { foreignKey: "author", targetKey: "_id" });
    }
}
