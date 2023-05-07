import { Types } from "mongoose"
import { UnitModel, getAllUnitsByCompany } from "../model/Unit"

export default {
    save: async (obj: any) => {
        return await UnitModel.create(obj);
    },
    findById: async (id: string) => {
        return await UnitModel.findById(id).populate("assets").populate("company");
    },
    findAll: async () => {
        return await UnitModel.find().populate("assets").populate("company");
    },
    deleteById: async (id: string) => {
        return await UnitModel.findByIdAndDelete(id);
    },
    findAllUnitsByCompany: async (id: string) => {
        return await getAllUnitsByCompany(new Types.ObjectId(id));
    }
}