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
import UserController from "./controller/userController.js"

// -> Configure to read .env file
dotenv.config();

// -> Configure express
const app = express()
app.use(express.json())
const port  = 3000

// -> Connection to cloud database
const base_url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@gotamagica-cluster.tosaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const databse = mongoose.connect(base_url)


const userControler =  new UserController()



userControler.findByCPF()


console.log(user)
mongoose.connection.close()