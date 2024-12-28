import { IUser } from "../types/user/user";
import { BaseService } from "./BaseService";

class UserService extends BaseService<IUser> {
    constructor() {
        super('users');
    }
}

export const userService = new UserService();
