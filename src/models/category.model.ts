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
                    unique: true,
                },
                name: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                slug: {
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
                deletedAt: {
                    type: DataTypes.DATE(),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "categories",
                modelName: "category",
                charset: "utf8",
                collate: "utf8_unicode_ci",
                paranoid: true,
                timestamps: true,
            }
        );
    }

    static associate() {
        this.hasOne(Club, {
            foreignKey: "categoryId",
            as: "category",
            sourceKey: "_id",
            onDelete: "CASCADE",
        });
    }
}
