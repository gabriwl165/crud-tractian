import { UserModel, findByLogin } from '../model/User'
import { hashPassword, isValidatePassword } from '../utils/AuthenticationUtils'
import { UserLoginInterfaceDTO, UserDTO } from '../dto/UserDTO'


export default {
    save: async (obj: any) => {
        const {password} = obj
        obj.password = await hashPassword(password)
        await UserModel.create(obj)
    },
    findByLogin: async (login: string) => {
        return await findByLogin(login);
    },
    validatePassword: async (login: string, password: string) => {
        const userFromDB: UserLoginInterfaceDTO = await findByLogin(login)
        
        return await isValidatePassword(password, userFromDB.password)   
    },
    findById: async (id: string) => {
        return await UserModel.findById(id).populate("company");
    },
    findAll: async () => {
        return await UserModel.find().populate("company")
    },
    updateById: async (id: string, user: UserDTO) => {
        const {password} = user
        user.password = await hashPassword(password)
        await UserModel.findByIdAndUpdate(id, user)
    }
}