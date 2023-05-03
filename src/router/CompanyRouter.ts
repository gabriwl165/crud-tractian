import express from 'express'
import { GenericRouter } from '../generic/GenericRouter'
import { CompanyController } from '../controller/CompanyController'

class CompanyRouter extends GenericRouter<CompanyController> {

    protected getController(): CompanyController {
        return new CompanyController();
    }

}
const company: CompanyRouter = new CompanyRouter();

export default (router: express.Router) => {
    company.getRoutes(router)
    
}