import {model,Schema} from "mongoose"
const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    passwordHash:{
        type: String,
    },
    role: { type: String, enum: ['customer', 'manager'], default: 'customer' },
},{timestamps:true})
const User = model("User",UserSchema)
export default User