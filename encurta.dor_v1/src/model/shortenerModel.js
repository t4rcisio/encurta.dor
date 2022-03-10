import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();


const shortenerSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user_owner: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    hits: {
        type: Number,
        required: true
    },
    expireteDate: {
        type: Date,
        default: null
    },
    enable: {
        type: Boolean,
        default: true
    },
    metaData: [mongoose.Schema.Types.Mixed]

})

const shortenerModel = mongoose.model(process.env.COLLECTION_SHORTENER, shortenerSchema)
export default shortenerModel