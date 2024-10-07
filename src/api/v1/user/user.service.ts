import UserRepository from "./user.repository";

export default class UserService {
    public findUser = async (username: string) => {
        return new UserRepository().find(username);
    };

    public createUser = async (userData: IUser) => {
        return new UserRepository().create(userData);
    };
}
