
import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import userClient from "../database/userClient.js"

dotenv.config()

const AuthMiddleware = (request, response, next) =>{

    const {auth} = request.headers

    if(request.url == "/api/login" || request.url == "/api/new" || request.url == "/:hash")
        next()

    
    const [,hash] = auth.split(' ')
    try{
        const payload = jsonwebtoken.verify(hash, process.env.WEBTOKEN)

    }catch(e){
        return response.send("Invalid autentication").status(400)
    }


    

    console.log("Autentication running")
    next()
}


export default AuthMiddleware