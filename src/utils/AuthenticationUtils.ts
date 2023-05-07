import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserLoginInterfaceDTO } from '../dto/UserDTO'

const saltRound = Number(process.env.HASH_SALT);
const secret = String(process.env.JWT_SECRET)

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt)
}

export const isValidatePassword = async (password: string, passwordFromDB: string) => {
    return bcrypt.compare(password, passwordFromDB)
}   

export const generateJwtToken = (user: UserLoginInterfaceDTO) => {
    delete user.password
    return jwt.sign(user, secret, {expiresIn: "30m"})
}

export const decryptJwt = (token: string): UserLoginInterfaceDTO => {

    const decoded = jwt.verify(token, secret) as UserLoginInterfaceDTO;
    return {
        login: decoded.login,
        password: undefined,
        permission: decoded.permission
    };
}

export const isValidJwtToken = (token: string): boolean => {
    try {
        jwt.verify(token, secret)
        return true
    } catch (err) {
        return false
    }
}