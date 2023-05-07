import { CompanyDTO } from "../dto/CompanyDTO";
import Company from "../model/Company";

export default {
    save: async (company: CompanyDTO) => {
        return await Company.create(company);
    },
    findById: async (id: string) => {
        return await Company.findOne({_id: id}).populate("users").populate("units");
    },
    findAll: async () => {
        return await Company.find().populate("users").populate("units");
    },
    deleteById: async (id: string) => {
        await Company.findByIdAndDelete(id)
    },
    updateByID: async (company: CompanyDTO, id: string) => {
       return await Company.findByIdAndUpdate(id, company)
    }
}