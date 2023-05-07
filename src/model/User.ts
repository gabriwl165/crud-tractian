import mongoose, { Types } from 'mongoose'

const UserSchema = new mongoose.Schema({
    login: {type: String, required: [true, 'Login is required'], unique: true},
    password: {type: String, required: [true, 'Password is required']},
    company: {type: Types.ObjectId, ref: "Company", required: [true, "Company is required"]},
    permission: {
        type: [{type: String, enum: ["CREATE", "READ", "WRITE", "DELETE"]}],
        required: [true, "Permissions of the use is required"],
        validate: {
            validator: (value: string[]) => {
                return value.length > 0
            },
            message: "Permissions of the use is required, ['CREATE', 'READ', 'WRITE', 'DELETE']"
        }
    }
})

export const UserModel =  mongoose.model("User", UserSchema);
export const findByLogin = (login: string) => UserModel.findOne({login: login});
