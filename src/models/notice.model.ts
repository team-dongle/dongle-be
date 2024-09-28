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
                },
                title: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                content: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "notices",
                modelName: "notice",
                charset: "utf8",
                collate: "utf8_unicode_ci",
            }
        );
    }

    static associate() {
        this.belongsTo(User, { foreignKey: "author", targetKey: "_id" });
    }
}
