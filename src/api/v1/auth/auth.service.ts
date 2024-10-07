import AuthRepository from "./auth.repository";

export default class AuthService {
    public findUser = (username: string) => {
        return new AuthRepository().findUser(username);
    };
}
