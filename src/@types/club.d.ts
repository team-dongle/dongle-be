import { NonAttribute } from "sequelize";
import Category from "../models/category.model";
import User from "../models/user.model";

export interface IClub {
    _id: number;
    name: string;
    contact: string;
    applyUrl: string;
    thumbnail: string;
    location: string;
    sns: string;
    logo: string;
    ownerId?: NonAttribute<User>;
    detail: string;
    recruitPeriod: Date;
    isRecruiting: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    categoryId?: NonAttribute<Category>;
}
