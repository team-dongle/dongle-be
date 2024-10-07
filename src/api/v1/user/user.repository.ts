import User from "../../../models/user.model";

export default class UserRepository {
    public find = async (username: string) => {
        return User.findOne({ where: { username: username } });
    };

    public create = async (userData: IUser) => {
        return User.create({ ...userData });
    };
}
