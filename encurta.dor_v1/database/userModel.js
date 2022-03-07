/* 
    -> install mongoose
*/

import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const userSchema = new mongoose.Schema({
    _id     : {type: String, required: true},
    name    : {type: String, required: true},
    cpf     : {type: String, required: true},
    email   : {type: String, required: true},
    password: {type: String, required: true},
    phone   : {type: String, required: false},
    metaData: {
        created    : {type: Date, required: true},
        modificated: {type: String, required: false},
    },
    permissions: {
        perm: []
    }
})


const userModel = mongoose.model(process.env.COLLECTION, userSchema);

export default userModel;