import {Request, Response} from 'express'
import UnitService from '../services/UnitService';
import RetornoHTTP from '../dto/ResponseDTO';

const errorTemplateErro = (method: string) => {
    return `Error while trying to ${method} Unit`
}

export const saveUnit = async (req: Request, res: Response) => {
    try {
        if(!req.body){
            return res.status(400).send(new RetornoHTTP('Invalid request body data', false))
        }
        const unit = await UnitService.save(req.body)
        return res.status(200).send(new RetornoHTTP('successfully created', true, unit))
    } catch(err) {
        return res.status(500).send(new RetornoHTTP(err.message, false))
    }
}

export const findAllUnitsByCompany = async (req: Request, res: Response) => {
    try {
        if(!req.params?.id){
            return res.status(400).send(new RetornoHTTP('Invalid request param', false))
        }
        
        const {id} = req.params
        console.log(id)
        const company = await UnitService.findAllUnitsByCompany(id);
        
        return res.status(200).send(new RetornoHTTP('Company successfully recovered ', true, company))
    } catch (err){
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("find"), false, err))
    }
}

export const findUnitById = async (req: Request, res: Response) => {
    try {
        if(!req.params?.id){
            return res.status(400).send(new RetornoHTTP('Invalid request param', false))
        }
        
        const {id} = req.params
        const unit = await UnitService.findById(id);
        
        return res.status(200).send(new RetornoHTTP('Company successfully recovered ', true, unit))
    } catch (err){
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("find"), false, err))
    }
}

export const findAllUnits = async (req: Request, res: Response) => {
    try {
        const unit = await UnitService.findAll()
        return res.status(200).send(new RetornoHTTP("All companys successfully recovered", true, unit))
    } catch (err) {
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("find all"), false, err))
    }
}

export const deleteUnitById = async (req: Request, res: Response) => {
    try {
        if(!req.params?.id){
            return res.status(400).send(new RetornoHTTP("Invalid request param", false))
        }

        const {id} = req.params
        await UnitService.deleteById(id)
        return res.status(200).send(new RetornoHTTP("Company successfully deleted", true))
    } catch (err) {
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("delete"), false,  err))
    }
}
