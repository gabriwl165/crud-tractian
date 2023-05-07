import mongoose, { Types } from "mongoose"

const CompanySchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name of the company is required"]},
    units: [{type: Types.ObjectId, ref: "Unit", default: []}],
    users: [{type: Types.ObjectId, ref: "User", default: []}],
    timestamp: {type: Date, default: Date.now()}
})

export default mongoose.model("Company", CompanySchema)