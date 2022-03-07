



import userClient from "../database/userClient.js"
import crypto from "crypto"
import bcrypt from "bcryptjs"

class UserController{

    hashPassword(password){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }


    async findById(request, response){
        const {_id} = request.body;
        
        if(!_id)
            return response.send({"Message":"Error: missing body data"}).status(400)


        const  data = await userClient.getUser(_id);

        if(!data.User)
            data.status = false
        
        response.send(data).status(200)
        //response.send({data}).status(200)    
    }

    async createUser(request, response){
        const {name, email, password,} = request.body;

        if(name && email && password){
            // -> Create new user object 
            const user = {
                "_id": crypto.randomUUID(),
                name, 
                email, 
                "password":  this.hashPassword(password),
                "metaData.created": Date.now()
            }
            const data = await userClient.newUser(user);
            return response.send(data).status(200)
        }

        return response.send({"Message":"Error: missing body data"}).status(400)

        
    }

    async updateUser(request, response){
        const {id} = request.params

        const {name, email, password} = request.body

        if(!id)
            return response.send({"Message":"Error: missing data"}).status(400)
        
        const data = await userClient.getUser(id)

        if(!data.status)
            return response.send({"Message":"Error: userId not found"}).status(400)

        const user = {
            name : name?            name : data.name,
            email: email?          email : data.email,
            password: password? password : data.password,
            "metaData.modificated": Date.now()
            
        }

        const res = await userClient.editUser(id, user)
        return response.send(res).status(200)
    }

    async deleteUser(request, response){
        const {id} = request.params

        if(!id)
            return response.send({"Message":"Error: missing data"}).status(400)
        
        const data = await userClient.deleteUser(id)
        return response.send(data).status(200)    
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