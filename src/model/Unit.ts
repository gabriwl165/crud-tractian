import mongoose, { Types } from "mongoose";

const UnitSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name of unit is required"]},
    assets: [{type: Types.ObjectId, ref: "Asset", default: []}],
    company: {type: Types.ObjectId, ref:"Company", required: [true, "Company is required"], default: []},
    timestamp: {type: Date, default: Date.now()}
})

export const UnitModel = mongoose.model("Unit", UnitSchema)
export const getAllUnitsByCompany = (id: Types.ObjectId) => UnitModel.find({company: id})