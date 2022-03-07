

import shortenerClient from "../database/shortenerClient.js"


class ShortenerController{

    async redirect(request, response){
        const {url} =  request.params
        const data = await shortenerClient.getShortner(url)

        if(!data.Status)
            return  response.send("<h1>Url not found</h1>").status(404)
        

    }

    async create(request, response){
        const {name, }
    }

    async viewMyShorteners(request, response){

    }


}


export default ShortenerController