import { Request, Response } from "express"
import ResponseDTO from "../dto/ResponseDTO"
import AssetService from "../services/AssetService"
import { AssetDTO } from "../dto/AssetDTO"

export const saveAsset = async (req: Request, res: Response) => {
    try {
        if (!req.body) {
            return res.status(400).send(new ResponseDTO("Invalid request body data", false))
        }

        if(parseInt(req.body?.healthLevel) < 0 || parseInt(req.body?.healthLevel) > 100){
            return res.status(400).send(new ResponseDTO("Health level must be between 1 and 100", false))
        }
        
        const asset = await AssetService.save(req.body)
        return res.status(200).send(new ResponseDTO("Asset successfully created", true, asset))
    } catch (err) {
        return res.status(500).send(new ResponseDTO(err.message, false))
    }
}

export const updateAsset = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id || !req.body) {
            return res.status(400).send(new ResponseDTO('Invalid arguments', false))
        }

        const { id } = req.params
        const company: AssetDTO = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            model: req.body.model,
            owner: req.body.owner,
            status: req.body.status,
            healthLevel: req.body.healthLevel,
            units: req.body.units,
            timestamp: new Date(),
        }

        if(parseInt(company.healthLevel) < 0 || parseInt(company.healthLevel) > 100){
            return res.status(400).send(new ResponseDTO("Health level must be between 1 and 100", false))
        }

        await AssetService.updateById(company, id)
        const newCompany = await AssetService.findById(id)

        return res.status(200).send(new ResponseDTO('successfully updated', true, newCompany))

    } catch (err) {
        return res.status(500).send(new ResponseDTO(err.message, false))
    }
}

export const findAssetById = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id) {
            return res.status(400).send(new ResponseDTO("Invalid request param", false))
        }

        const { id } = req.params
        const asset = await AssetService.findById(id)
        return res.status(200).send(new ResponseDTO("Asset successfully recovered", true, asset))
    } catch (err) {
        return res.status(500).send(new ResponseDTO(err.message, false))
    }
}

export const getAllAssets = async (req: Request, res: Response) => {
    try {
        const asset = await AssetService.findAll()
        return res.status(200).send(new ResponseDTO("All assets successfully recovered", true, asset))
    } catch (err) {
        return res.status(500)
    }
}

export const findAllAssetByUnit = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id) {
            return res.status(400).send(new ResponseDTO("Invalid request param", false))
        }

        const { id } = req.params
        const assets = await AssetService.findAllAssetByUnit(id)
        return res.status(200).send(new ResponseDTO("All assets successfully recovered", true, assets))
    } catch (err) {
        return res.status(500)
    }
}

export const deleteAssetById = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id) {
            return res.status(400).send(new ResponseDTO("Invalid request param", false))
        }

        const { id } = req.params
        await AssetService.deleteById(id)
        return res.status(200).send(new ResponseDTO("Asset successfully deleted", true))
    } catch (err) {
        return res.status(500).send(new ResponseDTO(err.message, false))
    }
}