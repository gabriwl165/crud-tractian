import ResponseDTO from '../dto/ResponseDTO'
import express, {Request, Response} from 'express'
import { isValidJwtToken, decryptJwt } from '../utils/AuthenticationUtils'
import AuthService from '../services/AuthService'
import { UserLoginInterfaceDTO } from '../dto/UserDTO'

const getSessionTokenAndValidate = (req: Request) => {
    const sessionToken = req.get('Authorization')
    if(!sessionToken){
        throw new Error("Session Token isn't valid")
    }
    return sessionToken
}

export const isAuthenticated = async (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const sessionToken = getSessionTokenAndValidate(req) as string
        if(isValidJwtToken(sessionToken)){
            return next()
        } else {
            return res.status(401).send(new ResponseDTO("Authentication failed", false))
        }
    } catch (err){
        return res.status(401).send(new ResponseDTO("Authentication failed", false))
    }
}

export const hasPermissionToCreate = async (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const sessionToken = getSessionTokenAndValidate(req) as string

        const decryptToken = decryptJwt(sessionToken) as UserLoginInterfaceDTO
        const {login}  = decryptToken
        
        if(AuthService.hasCreatePermission(login) && decryptToken.permission.includes("CREATE")){
            next()
        } else {
            return res.status(401).send(new ResponseDTO("Authentication failed, user don't have enought access to do this", false))
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export const hasPermissionToRead = async (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const sessionToken = getSessionTokenAndValidate(req) as string

        const decryptToken = decryptJwt(sessionToken) as UserLoginInterfaceDTO
        const {login}  = decryptToken
        
        if(AuthService.hasReadPermission(login) && decryptToken.permission.includes("READ")){
            next()
        } else {
            return res.status(401).send(new ResponseDTO("Authentication failed, user don't have enought access to do this", false))
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export const hasPermissionToDelete = async (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const sessionToken = getSessionTokenAndValidate(req) as string

        const decryptToken = decryptJwt(sessionToken) as UserLoginInterfaceDTO
        console.log(decryptToken)
        const {login}  = decryptToken
        
        if(AuthService.hasDeletePermission(login) && decryptToken.permission.includes("DELETE")){
            next()
        } else {
            return res.status(401).send(new ResponseDTO("Authentication failed, user don't have enought access to do this", false))
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export const hasPermissionToWrite = async (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const sessionToken = getSessionTokenAndValidate(req) as string

        const decryptToken = decryptJwt(sessionToken) as UserLoginInterfaceDTO
        const {login}  = decryptToken
        
        if(AuthService.hasWritePermission(login) && decryptToken.permission.includes("WRITE")){
            next()
        } else {
            return res.status(401).send(new ResponseDTO("Authentication failed, user don't have enought access to do this", false))
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}
