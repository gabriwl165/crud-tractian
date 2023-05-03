import  CompanyModel  from "../db/Company.js"
import { GenericService } from "../generic/GenericService";

export class CompanyService extends GenericService{
    protected getSchema<CompanyModel>(): any {
        return new CompanyModel();
    }
}