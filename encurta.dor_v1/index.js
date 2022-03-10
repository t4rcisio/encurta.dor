
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
import userRouter from "./src/routers/userRouter.js"
import shortenerRouter from "./src/routers/shortenerRouter.js"
import AuthMiddleware from "./src/middleware/auth.middleware.js"

// -> Configure to read .env file
dotenv.config();

// -> Configure express
const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.set('trust proxy', true) // to get client ip
const port = 3000

// -> Connection to cloud database
const base_url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@gotamagica-cluster.tosaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const databse = mongoose.connect(base_url)



app.use(AuthMiddleware)
app.use("/api", userRouter)
app.use(shortenerRouter)



app.listen(port, () => {
    console.log(`Server running on ${port} port`)
})