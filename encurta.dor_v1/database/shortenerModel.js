

import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();


const shortenerSchema = new mongoose.Schema({
    _id          : {type: String, required: true},
    name         : {type: String, required: true},
    user_owner   : {type: String, required: true},
    url_source   : {type: String, required: true},
    url_shortened: {type: String, required: true},
    createdData  : {type: Date, default: Date.now},
    expireteDate : {type: Date, default: null},
    enable       : {type: Boolean, default: true},
    metaData     : [mongoose.Schema.Types.Mixed]
    
})

const shortenerModel = mongoose.model(process.env.COLLECTION_SHORTENER, shortenerSchema)
export default shortenerModel