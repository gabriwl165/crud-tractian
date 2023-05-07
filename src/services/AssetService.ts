import { AssetDTO } from '../dto/AssetDTO'
import { AssetModel, findAllAssetByUnit } from '../model/Asset'
import { Types } from "mongoose"

export default {
    save: async (obj: AssetDTO) => {
        return await AssetModel.create(obj)
    },
    findAll: async () => {
        return await AssetModel.find()
    },
    findById: async (id: string) => {
        return await AssetModel.findById(id).populate("units");
    },
    deleteById: async (id: string) => {
        await AssetModel.findByIdAndDelete(id)
    },
    findAllAssetByUnit: async (id: string) => {
        return await findAllAssetByUnit(new Types.ObjectId(id))
    },
    updateById: async (obj: AssetDTO, id: string) => {
        return await AssetModel.findByIdAndUpdate(id, obj)
    }
}