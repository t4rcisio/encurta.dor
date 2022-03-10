import shortenerClient from "../database/shortenerClient.js"
import crypto from "crypto"
import userAgent from "user-agent"

class ShortenerController {

    async redirect(request, response) {
        const {
            hash
        } = request.params

        const data = await shortenerClient.getShortner(hash)
        const userMetadata = userAgent.parse(request.headers["user-agent"])

        const metadata = {
            ip: request.ip,
            language: request.headers["accept-language"],
            userAgent: request.headers["user-agent"],
            userMetadata,
        }


        if (!data.shortenerObject)
            return response.send("<h1>Url not found</h1>").status(404)

        data.shortenerObject.hits++
        data.shortenerObject.metaData.push(metadata)
        await data.shortenerObject.save()

        return response.redirect(data.shortenerObject.link)
    }

    async create(request, response) {
        const {
            name,
            link
        } = request.body

        if (!name || !link)
            return response.send("Missing data").status(200)

        const [hash] = crypto.randomUUID().split("-")
        const shortener = {
            _id: crypto.randomUUID(),
            name: name,
            user_owner: "aaaa",
            link: link,
            hash: hash,
            hits: 0,
            created: Date.now(),
        }

        console.log(shortener)

        const data = await shortenerClient.createShortener(shortener)
        return response.send(data).status(200)
    }


    async delete(request, response){
        
    }

    async edit(request, response){
        
    }

    async getShoerteners(request, response){
        
    }



}


export default ShortenerController