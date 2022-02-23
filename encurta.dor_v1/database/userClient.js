
/*
    -> Install mongodb
    -> import dotenv
        -> to read .env file

*/

import dotenv from "dotenv"
import usermodel from "./userModel.js"
import mongoose from "mongoose"


dotenv.config();

const response = {"Data": "","status": "", "Date":  ""};

const db = {
    async getUser(cpf){
        try{
            response.Data = await usermodel.findOne({cpf})
            response.status = true
            response.Date = Date().toString()
        }
        catch(error){
            response.Data = error;
            response.status = false
        }
        finally{
            return response;
            mongoose.connection.close();
        }
        
    },
    async newUser(user){
        try{
            response.Data = await usermodel.create(user)
            response.status = true
            response.Date = Date().toString()
        }
        catch(error){
            response.Data = error;
            response.status = false
        }
        finally{
            return response;
            mongoose.connection.close();
        }

    },
    async editUser(user){

    },
    async deleteUser(user){

    }

}


export default db;
