import { Request, Response } from 'express'
import CompanyService from '../services/CompanyService';
import RetornoHTTP from '../dto/ResponseDTO';
import { CompanyDTO } from '../dto/CompanyDTO';

const errorTemplateErro = (method: string) => {
    return `Error while trying to ${method} company(s)`
}

export const saveCompany = async (req: Request, res: Response) => {
    try {
        if (!req.body) {
            return res.status(400).send(new RetornoHTTP('Invalid request body data', false))
        }

        const company: CompanyDTO = {
            name: req.body.name,
            units: req.body.units,
            users: req.body.users,
            timestamp: new Date()
        }

        const unitHasOnlyKey: boolean = company.units.every((unit: any) => typeof unit === 'string')
        if (unitHasOnlyKey) {
            const newCompany = await CompanyService.save(company)
            return res.status(200).send(new RetornoHTTP('successfully created', true, newCompany))
        } return res.status(400).send(new RetornoHTTP("Units must have only keys, not the whole object", false))

    } catch (err) {
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("create"), false, err))
    }
}

export const updateCompany = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id || !req.body) {
            return res.status(400).send(new RetornoHTTP('Invalid arguments', false))
        }

        const { id } = req.params
        const company: CompanyDTO = {
            name: req.body.name,
            units: req.body.units,
            users: req.body.users,
            timestamp: new Date()
        }

        const unitHasOnlyKey: boolean = company.units.every((unit: any) => typeof unit === 'string')

        if (unitHasOnlyKey) {

            await CompanyService.updateByID(company, id)
            const newCompany = await CompanyService.findById(id)

            return res.status(200).send(new RetornoHTTP('successfully updated', true, newCompany))
            
        } return res.status(400).send(new RetornoHTTP("Units must have only keys, not the whole object", false))

    } catch (err) {
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("update"), false, err))
    }
}

export const findCompanyById = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id) {
            return res.status(400).send(new RetornoHTTP('Invalid request param', false))
        }

        const { id } = req.params
        const company = await CompanyService.findById(id);

        return res.status(200).send(new RetornoHTTP('Company successfully recovered ', true, company))
    } catch (err) {
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("find"), false, err))
    }
}

export const findAllCompanys = async (req: Request, res: Response) => {
    try {
        const company = await CompanyService.findAll()
        return res.status(200).send(new RetornoHTTP("All companys successfully recovered", true, company))
    } catch (err) {
        return res.status(500).send(new RetornoHTTP(errorTemplateErro("find all"), false, err))
    }
}

export const deleteCompanyById = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id) {
            return res.status(400).send(new RetornoHTTP("Invalid request param", false))
        }

        const { id } = req.params
        await CompanyService.deleteById(id)
        return res.status(200).send(new RetornoHTTP("Company successfully deleted", true))
    } catch (err) {
        return res.status(500).send(new RetornoHTTP(err.message, false))
    }
}
