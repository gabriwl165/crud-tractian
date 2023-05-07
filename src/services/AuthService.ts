import UserService from "./UserService"
import { decryptJwt } from "../utils/AuthenticationUtils"

export default {
    hasCreatePermission: async (login: string) => {
        const user = await UserService.findByLogin(login)
        return user.permission.includes("CREATE")
    },
    hasReadPermission: async (login: string) => {
        const user = await UserService.findByLogin(login)
        return user.permission.includes("READ")
    },
    hasDeletePermission: async (login: string) => {
        const user = await UserService.findByLogin(login)
        return user.permission.includes("DELETE")
    },
    hasWritePermission: async (login: string) => {
        const user = await UserService.findByLogin(login)
        return user.permission.includes("WRITE")
    },
    decryptJwt: (token: string) => {
        return decryptJwt(token)
    }
}