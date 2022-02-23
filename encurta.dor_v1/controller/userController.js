



import userClient from "../database/userClient.js"
import crypto from "crypto"
import bcrypt from "bcryptjs"

class UserController{

    hashPassword(password){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }


    async findByCPF(request, response){
        const {cpf} = request.body;
        
        if(!cpf)
            return response.send({"Message":"Error: missing body data"}).status(400)


        const  data = userClient.getUser(cpf);

        if(data.Data)
            return response.send(data).status(200)
        
        return response.send("User not found").status(200)    
    }

    async createUser(request, response){
        const {name, cpf, email, password, phone} = request.body;

        if(name && cpf && email && password){
            const user = {
                "id": crypto.randomUUID,
                name, 
                cpf, 
                email, 
                "password":  hashPassword(password),
                "phone": phone, 
                "metaData":{
                    "created": Date()
                 }
            }
            console.log(user) 
        }
        
    }

    async updateUser(request, response){

    }

    async deleteUser(request, response){
        
    }

}

export default UserController


/*
    id      : {type: String, required: true},
    name    : {type: String, required: true},
    cpf     : {type: String, required: true},
    email   : {type: String, required: true},
    password: {type: String, required: true},
    phone   : {type: String, required: false},
    metaData: {
        created    : {type: Date, required: true},
        modificated: {type: Date, required: false},
    },
    permissions: {
        perm: []
    }
*/