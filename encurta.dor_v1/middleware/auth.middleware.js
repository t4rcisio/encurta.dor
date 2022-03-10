import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const AuthMiddleware = (request, response, next) => {
    const {
        auth
    } = request.headers

    if ((request.url === "/api/login" || request.url === "/api/new") && request.method == "POST" || request.method == "GET")
        return next()

    if (!auth)
        return response.send("autorization not found")

    const [, hash] = auth.split(' ')

    try {
        const vtoken = jsonwebtoken.verify(hash, process.env.WEBTOKEN)
    } catch (e) {
        return response.send("Unalthorized").status(401)
    }
    next()
}


export default AuthMiddleware