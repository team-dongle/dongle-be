import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";

export class Club extends Model<IClub> {
    static initialize(sequelize) {
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
                owner: {
                    type: DataTypes.STRING(255),
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
            foreignKey: "club",
            targetKey: "_id",
        });
    }
}
