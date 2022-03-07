


import shortenerModel from "./shortenerModel";

const response = {"shortenerObject": null, "Status": null, "Date": null }

const db = {
    async getShortner(url_shortened){
        try{
            response.shortenerObject = await shortenerModel.find({url_shortened})
            response.Status = true
        }catch(e){
            response.shortenerObject = e
            response.Status = false
        }finally{
            response.Date = Date.now()
            return response
        }
    },

    async createShortener(shortener){
        try{
            response.shortenerObject = await shortenerModel.create(shortener)
            response.Status = true
        }catch(e){
            response.shortenerObject = e
            response.Status = false
        }finally{
            response.Date = Date.now()
            return response
        }
    },

    async deleteShortener(shortener){
        try{
            response.shortenerObject = await shortenerModel.deleteOne({_id})
            response.Status = true
        }catch(e){
            response.shortenerObject = e
            response.Status = false
        }finally{
            response.Date = Date.now()
            return response
        }
    }
}


export default db