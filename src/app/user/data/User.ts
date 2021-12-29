import { Role } from "./Role";
import { UserStatus } from "./user.status";
import {Figurine} from "../../figurine/data/Figurine";

export interface User {
    sub: string;
    id: string;
    role: Role;
    status: UserStatus;
    token?: string;

    username: string;
    email: string;
    tel: string;

    collection: Figurine[];
}
