import { GenericController } from "../generic/GenericController";
import { CompanyService } from "../services/CompanyService";

export class CompanyController extends GenericController<CompanyService>{

    protected getService(): CompanyService {
        return new CompanyService();
    }

}