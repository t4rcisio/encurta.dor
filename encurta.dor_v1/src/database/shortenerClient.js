import shortenerModel from "../model/shortenerModel.js";

const response = {
    "shortenerObject": null,
    "Status": null,
    "Date": null
}

const db = {
    async getShortner(hash) {
        try {
            response.shortenerObject = await shortenerModel.findOne({
                hash
            })
            response.Status = true
        } catch (e) {
            response.shortenerObject = e
            response.Status = false
        } finally {
            response.Date = Date.now()
            return response
        }
    },

    async createShortener(shortener) {
        try {
            response.shortenerObject = await shortenerModel.create(shortener)

            response.Status = true
        } catch (e) {
            response.shortenerObject = e
            response.Status = false
        } finally {
            response.Date = Date.now()
            return response
        }
    },

    async deleteShortener(_id) {
        try {
            response.shortenerObject = await shortenerModel.deleteOne({
                _id
            })
            response.Status = true
        } catch (e) {
            response.shortenerObject = e
            response.Status = false
        } finally {
            response.Date = Date.now()
            return response
        }
    }
}


export default db