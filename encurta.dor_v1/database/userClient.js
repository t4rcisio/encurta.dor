
/*
    -> Install mongodb
    -> import dotenv
        -> to read .env file

*/

import usermodel from "./userModel.js"
import mongoose from "mongoose"


const response = {"User": "","status": "", "Time":  ""};

const db = {
    async getUser(_id){
        try{
            response.User = await usermodel.findOne({_id})
            response.status = true
        }
        catch(error){
            response.User = error;
            response.status = false
        }
        finally{
            const time  = new Date().toISOString();
            response.Time = time;
            return response
           
        }
        
    },
    async newUser(user){
        try{
            response.User = await usermodel.create(user)
            response.status = true
        }
        catch(error){
            response.User = error;
            response.status = false
        }
        finally{
            const time  = new Date().toISOString();
            response.Time = time;
            return response;
        }

    },
    async editUser(_id, newData){

        try{
            response.User = await usermodel.findByIdAndUpdate({_id}, newData, {new: true})
            response.status = true
        }
        catch(error){
            response.User = error;
            response.status = false
        }
        finally{
            const time  = new Date().toISOString();
            response.Time = time;
            return response;
        }


    },
    async deleteUser(_id){
        try{
            response.User = await usermodel.findByIdAndDelete({_id})
            response.status = true
        }
        catch(error){
            response.User = error;
            response.status = false
        }
        finally{
            const time  = new Date().toISOString();
            response.Time = time;
            return response;
        } 
    }

}


export default db;
