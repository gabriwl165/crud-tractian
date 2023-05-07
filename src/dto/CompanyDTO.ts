import { Types } from "mongoose"

export interface CompanyDTO {
    name: string
    units: [Types.ObjectId]
    users: [Types.ObjectId]
    timestamp: Date
}