import User from "./user.model";

export const UsersProvider = [{
    provide: 'UsersRepo',
    useValue: User
}]