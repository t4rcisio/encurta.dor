/*
    -> npm init -y
    -> change pkg.json config 
        -> add : "type": "module"
        -> add : "dev" : "yarn nodemon index.js"
    -> install Express
    -> install yanr
    -> install nodemon
*/
/*
import express from "express"
import crypto from "crypto"
import database from "./database/userClient.js"
import userModel from "./database/userModel.js";

const app = express();
app.use(express.json)

const port = 3000;

app.get("/api/user", (request, response)=>{

    const {cpf} = request.body
    userModel.
    database.getUser() 
})
*/

import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
import userRouter from "./routers/userRouter.js"
import shortenerRouter from "./routers/shortenerRouter.js"
import AuthMiddleware from "./middleware/auth.middleware.js"

// -> Configure to read .env file
dotenv.config();

// -> Configure express
const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.set('trust proxy', true) // to get client ip
const port  = 3000

// -> Connection to cloud database
const base_url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@gotamagica-cluster.tosaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const databse = mongoose.connect(base_url)



app.use(AuthMiddleware)
app.use("/api",userRouter)
app.use(shortenerRouter)



app.listen(port,()=>{
    console.log(`Server running on ${port} port`)
})

