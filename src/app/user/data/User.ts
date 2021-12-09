import { Role } from "./Role";
import { UserStatus } from "./user.status";

export interface User {
    sub: string;
    id: string;
    role: Role;
    status: UserStatus;
    token?: string;

    username: string;
    email: string;
    tel: string;
}
