import { DataTypes, Model, Sequelize } from "sequelize";
import Club from "./club.model";

export default class Category extends Model<ICategory> {
    static initialize(sequelize: Sequelize) {
        Category.init(
            {
                _id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER(),
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                slug: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "categories",
                modelName: "category",
                charset: "utf8",
                collate: "utf8_unicode_ci",
            }
        );
    }

    static associate() {
        this.belongsTo(Club, {
            foreignKey: "category",
            targetKey: "_id",
        });
    }
}
