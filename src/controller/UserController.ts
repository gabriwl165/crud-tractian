import { Request, Response } from "express"
import RetornoHTTP from "../dto/ResponseDTO"
import UserService from "../services/UserService"
import { UserDTO } from "dto/UserDTO"
import { Types } from 'mongoose'

const errorTemplateErro = (method: string) => {
    return `Error while trying to ${method} user(s)`
}

export const saveUser = async (req: Request, res: Response) => {
    try {
        if (!req.body) {
            return res.status(400).send(new RetornoHTTP("Invalid request body data", false))
        }

        const user = await UserService.save(req.body)
        return res.status(200).send(new RetornoHTTP("User successfully created", true, user))

    } catch (err) {
        if (err?.code === 11000) {
            return res.status(500).send(new RetornoHTTP(errorTemplateErro("create"), false, { "reason": "This login has already been used" }))
        }
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("create"), false, err))
    }
}

export const updateById = async (req: Request, res: Response) => {
    try {
        if (!req.body) {
            return res.status(400).send(new RetornoHTTP("Invalid request body data", false))
        }

        const { id } = req.params
        const { body } = req
        
        const assetFromDB: UserDTO = await UserService.findById(id) as unknown as UserDTO;
        
        if(!assetFromDB){
            return res.status(404).send(new RetornoHTTP("User not found to update", false, assetFromDB))
        }

        const user: UserDTO = {
            login: assetFromDB.login,
            password: body.password,
            company: new Types.ObjectId(body.company),
            permission: body.permission
        }

        await UserService.updateById(id, user)

        return res.status(200).send(new RetornoHTTP("User successfully updated", true, user))

    } catch (err) {
        if (err?.code === 11000) {
            return res.status(500).send(new RetornoHTTP(errorTemplateErro("create"), false, { "reason": "This login has already been used" }))
        }
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("create"), false, err))
    }
}

export const findUserById = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id) {
            return res.status(400).send(new RetornoHTTP('Invalid request param', false))
        }

        const { id } = req.params
        const user = await UserService.findById(id);

        return res.status(200).send(new RetornoHTTP('User successfully recovered ', true, user))
    } catch (err) {
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("find"), false, err))
    }
}

export const findAllUsers = async (req: Request, res: Response) => {
    try {
        const asset = await UserService.findAll()
        return res.status(200).send(new RetornoHTTP("All companys successfully recovered", true, asset))
    } catch (err) {
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("find all"), false, err))
    }
}


