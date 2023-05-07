import { Types } from "mongoose"

export interface UserDTO {
    login: string,
    password: string,
    company: Types.ObjectId,
    permission: []
}

export interface UserLoginInterfaceDTO {
    login: string,
    password: string,
    permission: string[]
}