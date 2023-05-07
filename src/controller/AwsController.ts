import { AssetDTO } from '../dto/AssetDTO'
import { Response } from 'express'
import AssetService from '../services/AssetService'
import ResponseDTO from '../dto/ResponseDTO'

export const saveImageIntoAWS = async (req: any, res: Response) => {
    try {
        const asset: AssetDTO = {
            name: req.body.name,
            image: req.file.location,
            description: req.body.description,
            model: req.body.model,
            owner: req.body.owner,
            status: req.body.status,
            healthLevel: req.body.healthLevel,
            units: req.body.units,
            timestamp: new Date(),
        }
        const assetSaved = await AssetService.save(asset)
        return res.status(200).send(new ResponseDTO("Asset created", true, assetSaved))
    } catch (err) {
        return res.status(500).send(err)
    }
}