import { Role } from "./user"

export interface UserLoginModel {
    id: string
    user: {
        id: string
        name: string
        role: Role
    }
}