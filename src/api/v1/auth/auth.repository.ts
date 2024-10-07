import User from "../../../models/user.model";

export default class AuthRepository {
    public findUser = async (username: string) => {
        return User.findOne({ where: { username: username } });
    };
}
