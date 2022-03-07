/* 
    -> install mongoose
*/

import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const userSchema = new mongoose.Schema({
    _id     : {type: String, required: true},
    name    : {type: String, required: true},
    email   : {type: String, required: true},
    password: {type: String, required: true},
    metaData: {
        created    : {type: Date, required: true},
        modificated: {type: Date, default: null},
    },
    user_links:[String],
    activeSection:[String],
    permissions: {
        perm: [String]
    }
})


const userModel = mongoose.model(process.env.COLLECTION_USERS, userSchema);

export default userModel;