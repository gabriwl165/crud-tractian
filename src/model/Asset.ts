import mongoose, { Types } from "mongoose"

const AssetSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name of the asset is required"]},
    image: {type: String, required: [true, "Image of the asset is required"]},
    description: {type: String, required: [true, "Description of the asset is required"]},
    model: {type: String, required: [true, "Model of the asset is required"]},
    owner: {type: String, required: [true, "Owner of the asset is required"]},
    status: {type: String, enum: ['Running', 'Alerting', 'Stopped'], required: [true, "Status of the asset is required"]},
    healthLevel: {type: String, required: [true, "Health Level between 0 and 100 is required"]},
    units: {type: Types.ObjectId, ref: "Unit", required: [true, "An asset must be attached to a unit"]},
    timestamp: {type: Date, default: Date.now()}
})

export const AssetModel = mongoose.model("Asset", AssetSchema)
export const findAllAssetByUnit = (id: Types.ObjectId) => AssetModel.find({units: id})