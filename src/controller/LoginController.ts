import { Request, Response } from "express"
import { UserLoginInterfaceDTO } from "../dto/UserDTO"
import { generateJwtToken } from '../utils/AuthenticationUtils'
import UserService from "../services/UserService"
import ReponseDTO from "../dto/ResponseDTO"

export const login = async (req: Request, res: Response) => {
    try {
        if(!req.body || !req.body.login || !req.body.password){
            return res.status(400).send(new ReponseDTO("Invalid request body data", false))
        }

        const {login} = req.body
        const {password} = req.body

        const userFromDB = await UserService.findByLogin(login)
        if(!userFromDB){
            return res.status(400).send(new ReponseDTO("User not found", false))
        }

        const isValid = await UserService.validatePassword(login, password)
        if(userFromDB && isValid){

            const user: UserLoginInterfaceDTO = {
                login: userFromDB.login,
                password: userFromDB.password,
                permission: userFromDB.permission
            }
            
            const jwt = generateJwtToken(user)
            res.status(200).send(new ReponseDTO("Login succesfull", true, jwt))
        } else {
            res.status(401).send(new ReponseDTO("invalid username or password", false))
        }
    }catch(err){
        res.status(500)
    }
}